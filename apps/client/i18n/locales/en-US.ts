export default {
	locales: {
		en: 'English',
		pt: 'Brazilian Portuguese'
	},
	components: {
		navbar: {
			tabs: {
				developers: 'Developers',
				creators: 'Creators',
				about: 'About'
			}
		},
		footer: {
			copy: 'Copyright © 2024 ZyroHub - All rights reserved.',
			privacy: 'Privacy Policy'
		},
		toolkit: {
			navigation: {
				search: 'Search for a tool...'
			},
			tool: {
				unselected: {
					description: 'Select a tool to continue.'
				},
				error: {
					title: 'An Error Occurred!',
					description: 'The tool you are trying to access may not exist or be unavailable at the moment.'
				}
			}
		}
	},
	pages: {
		meta: {
			description:
				'ZyroHub is a toolkit designed for developers, offering solutions for media conversion and manipulation. It includes a variety of essential tools, eliminating the need to install or rely on multiple software and services to accomplish common tasks.'
		},
		home: {
			title: 'Welcome to',
			description: 'Please select an option below to get started.',
			toolkits: {
				dev: 'Developers',
				creators: 'Creators'
			},
			about: 'ABOUT'
		},
		about: {
			meta: {
				title: 'About'
			},
			title: 'About ZyroHub',
			description:
				'ZyroHub is a toolkit designed for developers, offering solutions for media conversion and manipulation. It includes a variety of essential tools, eliminating the need to install or rely on multiple software and services to accomplish common tasks.'
		},
		developers: {
			meta: {
				title: 'Developers',
				description:
					'A set of essential tools for developers, offering solutions for common tasks such as text conversion, password generation, string encoding and decoding, and more.'
			},
			title: 'Developers'
		},
		creators: {
			meta: {
				title: 'Creators',
				description:
					'A set of essential tools for creators, offering solutions for common tasks such as image conversion, video editing, audio manipulation, and more.'
			},
			title: 'Creators'
		},
		privacy: {
			meta: {
				title: 'Privacy Policy',
				description: 'Check out our privacy policy and see how we protect your information.'
			},
			content: `
# Privacy Policy

Your privacy is important to us. It is ZyroHub's policy to respect your privacy regarding any information we may collect on the website [ZyroHub](https://zyrohub.app), and other sites we own and operate.

We only retain collected information for as long as necessary to provide you with your requested service. When we store data, we protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.

We don't share any personally identifying information publicly or with third parties, except when required to by law.

Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these websites, and cannot accept responsibility or liability for their respective privacy policies.

Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.

Additionally, we collect data anonymously through the Google Analytics tool to measure the use of our platform. No sensitive data is collected. By using our platform, you agree that information such as your city, country, and average session time will be recorded solely and exclusively for analytical purposes.

- The Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times a given ad is shown to you.
- For more information on Google AdSense, see the official Google AdSense privacy FAQ.
- We use ads to offset the costs of running this website and provide funding for future development. The behavioral advertising cookies used by this website are designed to ensure that you provide the most relevant ads wherever possible by anonymously tracking your interests and presenting similar things that may be of interest.

## User Commitment

The user undertakes to make appropriate use of the content and information that ZyroHub offers on the website and with an enunciative, but not limiting, character:

A) Not to engage in activities that are illegal or contrary to good faith and public services;
B) Not to disseminate propaganda or content of a racist, xenophobic nature, or related to gambling, any kind of illegal pornography, apology for terrorism or against human rights;
C) Not to cause damage to the physical (hardware) and logical (software) systems of ZyroHub, its suppliers, or third parties, to introduce or disseminate computer viruses or any other hardware or software systems that are capable of causing the aforementioned damage.

## More Information

We hope this is clear, and as mentioned earlier, if there is something that you aren't sure whether you need or not, it's usually safer to leave cookies enabled in case it interacts with one of the features you use on our website.
			`,
			date: '~ This policy is effective us of December 11, 2024.'
		}
	},
	tools: {
		bcrypt: {
			name: 'Bcrypt'
		}
	}
};
