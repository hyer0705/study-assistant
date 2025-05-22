import { Command } from '../types/index.ts';
import notifyProblem from './notify/problem.js';

const availableCommands: Command[] = [notifyProblem];

export default availableCommands;
