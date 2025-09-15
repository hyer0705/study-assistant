import { healthCheck } from './healthCheck';

import commands from './commands/index';
import { InteractionCreate, Ready } from './events/index';

import { ExtendedClient } from './types/index';

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

client.once('ready', Ready.execute);

client.on('interactionCreate', InteractionCreate.execute);

healthCheck.listen(8080);
client.login(Bun.env.DISCORD_TOKEN);
