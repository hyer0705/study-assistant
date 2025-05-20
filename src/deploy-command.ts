import { REST, Routes } from 'discord.js';

import beforeCommands from './commands/index.ts';

// Grab all the command folders from the commands directory you created earlier
const commands = [];

for (const command of beforeCommands) {
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(
      `[WARNING] ${command} 에서 'data' 또는 'execute' 속성을 찾을 수 없습니다.`,
    );
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(Bun.env.DISCORD_TOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const res = await rest.put(
      Routes.applicationGuildCommands(
        Bun.env.DISCORD_CLIENT_ID,
        Bun.env.DISCORD_GUILD_ID,
      ),
      { body: commands },
    );

    const data = res as Array<{
      application_id: string;
      name: string;
      description: string;
      options?: any[];
    }>;

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
