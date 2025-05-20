import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { Command } from './Command';

export class ExtendedClient extends Client {
  public commands: Collection<string, Command>;

  constructor() {
    super({ intents: [GatewayIntentBits.Guilds] });

    this.commands = new Collection();
  }
}
