import { ServerModule } from '@/modules';
import { Core } from './Core';

const core = new Core();

core.init();

export type app = typeof ServerModule.server;
