import type { Listeners } from '~/utils/types';

export const useListener = () => {
	const callbacks = ref<[string, (event: CustomEvent) => void][]>([]);

	const emit = <T extends keyof Listeners>(id: T, data: Listeners[T]) => {
		if (!import.meta.client) return;
		const event = new CustomEvent(id, { detail: data });

		window.dispatchEvent(event);
	};

	const listen = <T extends keyof Listeners>(id: T, callback: (data: Listeners[T]) => void) => {
		if (!import.meta.client) return;
		const handler = (event: CustomEvent) => {
			callback(event.detail);
		};

		callbacks.value.push([id, handler]);
		window.addEventListener(id, handler as EventListener);
	};

	onBeforeUnmount(() => {
		for (const [id, callback] of callbacks.value) {
			window.removeEventListener(id, callback as EventListener);
		}
	});

	return { emit, listen };
};
