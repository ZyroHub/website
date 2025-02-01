import { ServerModule } from '@/modules/index.js';
import { Core } from './Core.js';

const core = new Core();

core.init();

export type App = (typeof ServerModule)['server'];
