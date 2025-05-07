const path = require("node:path");

const { SlashCommandBuilder } = require("discord.js");
const { google } = require("googleapis");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("문제공지")
    .setDescription("다음주 풀이할 문제 공지."),
  async execute(interaction) {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(
        __dirname,
        "../../study-assistant-459107-account-credentials.json",
      ),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    try {
      // Google Sheets API 접근 설정
      const sheets = google.sheets({ version: "v4", auth });

      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: Bun.env.SHEET_ID,
        range: "2025!A2:Z", // 원하는 범위 지정
      });

      const rows = res.data.values;
      if (!rows || rows.length <= 0) {
        throw new Error("No data found...");
      }

      const currentDate = new Date();
      const problems = rows
        .filter((problem) => currentDate <= new Date(problem[0]))
        .sort((a, b) => a[0].localeCompare(b[0]))
        .slice(0, 3);

      let replyMessage = `[다음주 풀이할 문제 공지]\n\n발표자: ${problems[0][1]}\n\n`;
      for (const [_1, _2, name, link, _5] of problems) {
        replyMessage += `- [${name}](${link})\n`;
      }

      await interaction.reply(replyMessage);
    } catch (error) {
      console.error("Error accessing Google Sheets:", error);
      await interaction.reply("데이터를 가져오는 중 오류가 발생했습니다.");
    }
  },
};
