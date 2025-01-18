export const activeLogs = process.env.TASKS_LOGS_ACTIVE === 'true';

export const maxQueueSize = Number(process.env.TASKS_QUEUE_SIZE || 100);

export const concurrencyPerUser = Number(process.env.TASKS_CONCURRENCY_PER_USER || 10);

export const redisQueueName = process.env.REDIS_TASKS_QUEUE || 'tasks-queue';
export const redisRunningQueueName = process.env.REDIS_TASKS_RUNNING_QUEUE || 'tasks-running-queue';
