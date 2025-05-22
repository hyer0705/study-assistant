import { promises as fs } from 'fs';
import path from 'path';
import { google, Auth } from 'googleapis';
import { fileURLToPath } from 'url';
import { ServiceAccountKey } from '../types/GoogleAuth';

// TypeScript에서 __dirname 사용을 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 서비스 계정 키 파일 경로
const SERVICE_ACCOUNT_KEY_PATH: string = path.join(
  __dirname,
  '../study-assistant-account-credentials.json',
);

// 💾 인증 객체 캐싱용 변수
let cachedAuth: Auth.GoogleAuth | null = null;

/**
 * 🔐 서비스 계정으로 구글 인증하는 함수
 * 브라우저 인증이 필요 없는 서버-to-서버 인증
 */
export async function authorizeServiceAccount(): Promise<Auth.GoogleAuth> {
  // 이미 인증된 객체가 있으면 재사용
  if (cachedAuth) {
    return cachedAuth;
  }

  try {
    // 로컬 파일에서 서비스 계정 키를 읽는 방법
    const keyFile = await fs.readFile(SERVICE_ACCOUNT_KEY_PATH, 'utf8');
    const serviceAccountKey: ServiceAccountKey = JSON.parse(keyFile);

    const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
      credentials: serviceAccountKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    // 캐싱해서 다음번에 재사용
    cachedAuth = auth;
    console.log('✅ Google 서비스 계정 인증 성공');
    return auth;
  } catch (error) {
    console.error('❌ 서비스 계정 인증 실패:', error);
    throw new Error('서비스 계정 키 파일을 확인해주세요.');
  }
}

/**
 * 🔄 인증 객체 캐시 초기화 (필요시 재인증용)
 */
export function resetAuthCache(): void {
  cachedAuth = null;
  console.log('🔄 인증 캐시가 초기화되었습니다.');
}

/**
 * 📊 인증된 Sheets API 클라이언트 가져오기
 */
export async function getSheetsClient(): Promise<any> {
  const auth = await authorizeServiceAccount();
  const authClient = await auth.getClient();

  return google.sheets({
    version: 'v4',
    auth: authClient as Auth.OAuth2Client,
  });
}
