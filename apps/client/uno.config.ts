import { defineConfig, presetMini } from 'unocss';

export default defineConfig({
	theme: {
		colors: {
			primary: {
				50: 'var(--primary_50)',
				100: 'var(--primary_100)',
				200: 'var(--primary_200)',
				300: 'var(--primary_300)',
				400: 'var(--primary_400)',
				500: 'var(--primary_500)',
				600: 'var(--primary_600)',
				700: 'var(--primary_700)',
				800: 'var(--primary_800)',
				900: 'var(--primary_900)',
				950: 'var(--primary_950)'
			},
			black: {
				50: 'var(--black_50)',
				100: 'var(--black_100)',
				200: 'var(--black_200)',
				300: 'var(--black_300)',
				400: 'var(--black_400)',
				500: 'var(--black_500)',
				600: 'var(--black_600)',
				700: 'var(--black_700)',
				800: 'var(--black_800)',
				900: 'var(--black_900)',
				950: 'var(--black_950)'
			},
			neutral: {
				50: 'var(--neutral_50)',
				100: 'var(--neutral_100)',
				200: 'var(--neutral_200)',
				300: 'var(--neutral_300)',
				400: 'var(--neutral_400)',
				500: 'var(--neutral_500)',
				600: 'var(--neutral_600)',
				700: 'var(--neutral_700)',
				800: 'var(--neutral_800)',
				900: 'var(--neutral_900)',
				950: 'var(--neutral_950)'
			},
			red: {
				50: 'var(--red_50)',
				100: 'var(--red_100)',
				200: 'var(--red_200)',
				300: 'var(--red_300)',
				400: 'var(--red_400)',
				500: 'var(--red_500)',
				600: 'var(--red_600)',
				700: 'var(--red_700)',
				800: 'var(--red_800)',
				900: 'var(--red_900)',
				950: 'var(--red_950)'
			},
			green: {
				50: 'var(--green_50)',
				100: 'var(--green_100)',
				200: 'var(--green_200)',
				300: 'var(--green_300)',
				400: 'var(--green_400)',
				500: 'var(--green_500)',
				600: 'var(--green_600)',
				700: 'var(--green_700)',
				800: 'var(--green_800)',
				900: 'var(--green_900)',
				950: 'var(--green_950)'
			}
		}
	},
	presets: [
		presetMini({
			dark: {
				dark: '.dark-mode',
				light: '.light-mode'
			}
		})
	],
	rules: []
});
