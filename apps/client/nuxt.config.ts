const path = require('path');

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: true,
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	modules: [
		'@nuxtjs/i18n',
		'@nuxtjs/sitemap',
		'@nuxtjs/robots',
		'@nuxtjs/google-fonts',
		'@nuxt/image',
		'@unocss/nuxt',
		'@nuxtjs/color-mode',
		'@nuxt/icon',
		'@pinia/nuxt'
	],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler'
				}
			}
		},
		resolve: {
			alias: {
				'#mdc-imports': path.resolve(__dirname, './stub-mdc-imports.ts'),
				'#mdc-configs': path.resolve(__dirname, './stub-mdc-imports.ts')
			}
		}
	},

	devServer: {
		port: process.env.PORT ? Number(process.env.PORT) : 3e3
	},

	nitro: {
		output: {
			publicDir: path.join(__dirname, 'dist'),
			serverDir: path.join(__dirname, 'dist', 'server'),
			dir: path.join(__dirname, 'dist')
		}
	},

	app: { pageTransition: { name: 'transition_route_switch', mode: 'out-in' } },

	image: {
		provider: 'ipx'
	},

	pinia: {
		storesDirs: ['./stores/**']
	},

	site: {
		url: 'https://zyrohub.app',
		name: 'ZyroHub'
	},

	sitemap: {
		sources: ['/api/__sitemap__/urls']
	},

	googleFonts: {
		prefetch: true,
		preconnect: true,
		preload: true,
		download: true,
		display: 'swap',
		families: {
			Poppins: [400, 500, 600, 700],
			Cookie: [400]
		}
	},

	i18n: {
		strategy: 'prefix_except_default',
		defaultLocale: 'en',
		lazy: true,
		baseUrl: 'https://zyrohub.app',
		skipSettingLocaleOnNavigate: true,
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
				file: 'en-US.ts'
			},
			{
				code: 'pt',
				language: 'pt-BR',
				name: 'Português Brasil',
				file: 'pt-BR.ts'
			},
			{
				code: 'es',
				language: 'es-ES',
				name: 'Español',
				file: 'es-ES.ts'
			}
		]
	},

	icon: {
		clientBundle: {
			icons: [
				'material-symbols-light:dark-mode',
				'material-symbols-light:light-mode',

				'mdi:check-bold',
				'mdi:content-copy',

				'circle-flags:us-um',
				'circle-flags:br',
				'circle-flags:es'
			]
		}
	},

	runtimeConfig: {
		buy_me_a_coffee_token: process.env.BUY_ME_A_COFFEE_TOKEN,

		public: {
			server_url: process.env.SERVER_FULL_URL || 'http://localhost:3000',
			github_repo: process.env.GITHUB_REPO,
			buy_me_a_coffee_id: process.env.BUY_ME_A_COFFEE_ID,
			buy_me_a_coffee_slug: process.env.BUY_ME_A_COFFEE_SLUG
		}
	}
});
