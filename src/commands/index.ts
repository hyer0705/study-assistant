import { Command } from '../types/Command.js';
import notifyProblem from './notify/problem.js';

const availableCommands: Command[] = [notifyProblem];

export default availableCommands;
