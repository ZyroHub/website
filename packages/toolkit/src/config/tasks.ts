export const activeLogs = process.env.TASKS_LOGS_ACTIVE === 'true';

export const maxQueueSize = Number(process.env.TASKS_QUEUE_SIZE || 100);
