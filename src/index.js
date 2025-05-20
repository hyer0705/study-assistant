import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { healthCheck } from './healthCheck.js';

import commands from './commands/index.js';

import interactionCreate from './events/interactionCreate.js';
import ready from './events/ready.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

for (const command of commands) {
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.warn(
      `[WARNING] ${command.data.name} 에서 'data' 또는 'execute' 속성을 찾을 수 없습니다.`,
    );
  }
}

client.once('ready', ready.execute);

client.on('interactionCreate', interactionCreate.execute);

healthCheck.listen(8080);
client.login(Bun.env.DISCORD_TOKEN);
