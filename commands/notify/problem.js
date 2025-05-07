const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("문제공지")
    .setDescription("다음주 풀이할 문제 공지."),
  async execute(interaction) {
    await interaction.reply("[다음주 풀이할 문제 공지]\n\n발표자: @@@");
  },
};
