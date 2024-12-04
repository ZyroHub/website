const path = require('path');

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: true,
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	modules: [
		'@nuxtjs/sitemap',
		'@nuxtjs/robots',
		'@unocss/nuxt',
		'@nuxtjs/google-fonts',
		'@nuxt/image',
		'@nuxtjs/i18n'
	],

	nitro: {
		output: {
			publicDir: path.join(__dirname, 'dist'),
			serverDir: path.join(__dirname, 'dist', 'server'),
			dir: path.join(__dirname, 'dist')
		}
	},

	image: {
		provider: 'ipx'
	},

	// site: {
	// 	url: 'https://zyrohub.com',
	// 	name: 'ZyroHub'
	// },

	googleFonts: {
		prefetch: true,
		preconnect: true,
		preload: true,
		display: 'swap',
		families: {
			Poppins: [400, 500, 600, 700]
		}
	},

	i18n: {
		strategy: 'prefix_except_default',
		defaultLocale: 'en',
		lazy: true,
		baseUrl: 'https://zyrohub.com',
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root',
			alwaysRedirect: false
		},
		locales: [
			{
				code: 'en',
				language: 'en-US',
				name: 'English',
				file: 'en-US.json'
			},
			{
				code: 'pt',
				language: 'pt-BR',
				name: 'Português Brasil',
				file: 'pt-BR.json'
			}
		]
	}
});
