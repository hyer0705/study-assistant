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
      console.log(currentDate < new Date(problem[0]));

      return currentDate <= new Date(problem[0]);
    });

  if (processedRows.length === 0) {
    throw new Error('풀이할 문제가 존재하지 않습니다...');
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
      const replyMessage = formatReplyMessage(problems);

      await interaction.reply(replyMessage);

      const message = await interaction.fetchReply();
      if (!message) {
        throw new Error('메시지를 가져오지 못했습니다...');
      }

      const res = await message.pin();
      if (!res) {
        throw new Error('pin 처리 결과가 없습니다...');
      }
    } catch (error) {
      console.error({
        message: '문제 공지 명령어 실행 중 오류 발생',
        user: interaction.user.tag,
        guild: interaction.guild?.name,
        errorObject: error,
        timestamp: new Date().toISOString(),
      });

      let userFriendlyMessage =
        '앗, 명령어를 처리하는 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.';

      if (error instanceof Error) {
        if (error.message.includes('풀이할 문제가 존재하지 않습니다')) {
          userFriendlyMessage =
            '아직 다음 주 문제가 등록되지 않은 것 같아요. 관리자에게 문의해보세요!';
        } else if (error.message.includes('pin 처리 결과가 없습니다')) {
          userFriendlyMessage =
            "메시지를 고정하는 데 실패했어요. 봇에게 '메시지 관리' 권한이 있는지 확인해주세요.";
        } else if (error.message.includes('메시지를 가져오지 못했습니다')) {
          userFriendlyMessage =
            '공지 메시지를 보냈지만, 해당 메시지를 다시 찾는 데 실패하여 고정할 수 없었어요.';
        }
      }

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: userFriendlyMessage,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: userFriendlyMessage,
          ephemeral: true,
        });
      }
    }
  },
};
