import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { getSheetsClient } from '../../auth/index';

type ProblemRow = [string, string, string, string, string];

const fetchProblems = async (): Promise<ProblemRow[]> => {
  const sheets = await getSheetsClient();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: Bun.env.SHEET_ID,
    range: '2025!A2:Z',
  });

  const rows: string[][] = res.data.values || [];

  const currentDate = new Date();
  const processedRows: ProblemRow[] = rows
    .filter((row): row is ProblemRow => row.length === 5)
    .filter(problem => {
      console.log(currentDate, new Date(problem[0]));
      console.log(currentDate <= new Date(problem[0]));

      return currentDate <= new Date(problem[0]);
    });

  if (processedRows.length === 0) {
    throw new Error('No data found...');
  }

  const minDate = processedRows.map(problem => problem[0]).sort()[0];

  const nextProblems = processedRows.filter(problem => problem[0] === minDate);

  return nextProblems;
};

const formatReplyMessage = (problems: ProblemRow[]): string => {
  let replyMessage = `[다음주 풀이할 문제]\n\n`;

  for (const [_1, _2, name, link, _5] of problems) {
    replyMessage += `- [${name}](${link})\n`;
  }

  return replyMessage;
};

export default {
  data: new SlashCommandBuilder()
    .setName('문제공지')
    .setDescription('다음주 풀이할 문제 공지.'),
  async execute(interaction: CommandInteraction): Promise<void> {
    try {
      const problems = await fetchProblems();
      if (problems.length <= 0) {
        interaction.reply('검색된 데이터가 없습니다...');
        return;
      }

      const replyMessage = formatReplyMessage(problems);

      await interaction.reply(replyMessage);

      const message = await interaction.fetchReply();
      if (!message) {
        throw new Error('메시지가 가져오지 못했습니다...');
      }

      const res = await message.pin();
      if (!res) {
        throw new Error('pin 처리 결과가 없습니다...');
      }
    } catch (error) {
      console.error('Error accessing Google Sheets:', error);
      await interaction.reply('데이터를 가져오는 중 오류가 발생했습니다.');
    }
  },
};
