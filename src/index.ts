import { healthCheck } from './healthCheck.ts';

import commands from './commands/index.ts';

import interactionCreate from './events/interactionCreate.ts';
import ready from './events/ready.ts';
import { ExtendedClient } from './types/ExtendedClient.ts';

const client = new ExtendedClient();

for (const command of commands) {
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.warn(
      `[WARNING] ${command} 에서 'data' 또는 'execute' 속성을 찾을 수 없습니다.`,
    );
  }
}

client.once('ready', ready.execute);

client.on('interactionCreate', interactionCreate.execute);

healthCheck.listen(8080);
client.login(Bun.env.DISCORD_TOKEN);
