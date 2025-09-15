import { Command } from '../types/index';
import notifyProblem from './notify/problem';

const availableCommands: Command[] = [notifyProblem];

export default availableCommands;
