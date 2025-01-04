import { defineConfig } from 'unocss';

export default defineConfig({
	rules: [
		// Position
		['relative', { position: 'relative' }],
		['absolute', { position: 'absolute' }],
		['fixed', { position: 'fixed' }],
		['sticky', { position: 'sticky' }],

		// Sizes
		['w-full', { width: '100%' }],
		['w-screen', { width: '100vw' }],

		['max-w-full', { ['max-width']: '100%' }],
		['max-w-max', { ['max-width']: 'max-content' }],
		[/^max-w-(\d+)$/, ([, d]) => ({ ['max-width']: `${Number(d) / 4}rem` })],

		['h-full', { height: '100%' }],
		['h-screen', { height: '100vh' }],

		['max-h-full', { ['max-height']: '100%' }],
		['max-h-max', { ['max-height']: 'max-content' }],
		[/^max-h-(\d+)$/, ([, d]) => ({ ['max-height']: `${Number(d) / 4}rem` })],

		// Flex
		['flex', { display: 'flex' }],
		['flex-column', { flexDirection: 'column' }],

		['justify-center', { ['justify-content']: 'center' }],
		['justify-between', { ['justify-content']: 'space-between' }],
		['justify-around', { ['justify-content']: 'space-around' }],
		['justify-evenly', { ['justify-content']: 'space-evenly' }],
		['justify-start', { ['justify-content']: 'flex-start' }],
		['justify-end', { ['justify-content']: 'flex-end' }],

		['items-center', { ['align-items']: 'center' }],
		['items-start', { ['align-items']: 'flex-start' }],
		['items-end', { ['align-items']: 'flex-end' }],
		['items-baseline', { ['align-items']: 'baseline' }],
		['items-stretch', { ['align-items']: 'stretch' }],

		// Position
		[/^l-(\d+)$/, ([, d]) => ({ left: `${Number(d) / 4}rem` })],
		[/^t-(\d+)$/, ([, d]) => ({ top: `${Number(d) / 4}rem` })],
		[/^r-(\d+)$/, ([, d]) => ({ right: `${Number(d) / 4}rem` })],
		[/^b-(\d+)$/, ([, d]) => ({ bottom: `${Number(d) / 4}rem` })],

		// Margin
		[/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) / 4}rem` })],
		[/^ml-(\d+)$/, ([, d]) => ({ ['margin-left']: `${Number(d) / 4}rem` })],
		[/^mt-(\d+)$/, ([, d]) => ({ ['margin-top']: `${Number(d) / 4}rem` })],
		[/^mr-(\d+)$/, ([, d]) => ({ ['margin-right']: `${Number(d) / 4}rem` })],
		[/^mb-(\d+)$/, ([, d]) => ({ ['margin-bottom']: `${Number(d) / 4}rem` })],
		[
			/^mx-(\d+)$/,
			([, d]) => ({ ['margin-left']: `${Number(d) / 4}rem`, ['margin-right']: `${Number(d) / 4}rem` })
		],
		[
			/^my-(\d+)$/,
			([, d]) => ({ ['margin-top']: `${Number(d) / 4}rem`, ['margin-bottom']: `${Number(d) / 4}rem` })
		],

		// Padding
		[/^p-(\d+)$/, ([, d]) => ({ padding: `${Number(d) / 4}rem` })],
		[/^pl-(\d+)$/, ([, d]) => ({ ['padding-left']: `${Number(d) / 4}rem` })],
		[/^pt-(\d+)$/, ([, d]) => ({ ['padding-top']: `${Number(d) / 4}rem` })],
		[/^pr-(\d+)$/, ([, d]) => ({ ['padding-right']: `${Number(d) / 4}rem` })],
		[/^pb-(\d+)$/, ([, d]) => ({ ['padding-bottom']: `${Number(d) / 4}rem` })],
		[
			/^px-(\d+)$/,
			([, d]) => ({ ['padding-left']: `${Number(d) / 4}rem`, ['padding-right']: `${Number(d) / 4}rem` })
		],
		[
			/^py-(\d+)$/,
			([, d]) => ({ ['padding-top']: `${Number(d) / 4}rem`, ['padding-bottom']: `${Number(d) / 4}rem` })
		],

		// Text
		['text-center', { textAlign: 'center' }],
		['text-left', { textAlign: 'left' }],
		['text-right', { textAlign: 'right' }],
		['text-justify', { textAlign: 'justify' }],
		['text-nowrap', { whiteSpace: 'nowrap' }],
		['text-truncate', { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }],
		[/^text-(\d+)$/, ([, d]) => ({ fontSize: `${Number(d) / 4}rem` })],

		// Misc
		[/^gap-(\d+)$/, ([, d]) => ({ gap: `${Number(d) / 4}rem` })]
	]
});
