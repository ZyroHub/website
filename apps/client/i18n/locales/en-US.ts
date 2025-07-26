export default {
	locales: {
		en: 'English',
		pt: 'Português Brasil',
		es: 'Español'
	},
	components: {
		contributors: {
			github: 'GitHub Contributors',
			buy_me_a_coffee: 'Buy Me a Coffee Supporters',
			more: 'View All'
		},
		footer: {
			copy: 'Copyright © {year} ZyroHub - All rights reserved.',
			privacy: 'Privacy Policy'
		},
		inputs: {
			image_box: {
				preview: {
					buttons: {
						download: 'Download',
						clear: 'Clear'
					}
				},
				no_image: {
					description: 'Drag and drop an image here.',
					or: 'or',
					upload: 'Select a File'
				}
			},
			text_area: {
				copy: {
					default: 'Copy',
					success: 'Copied!'
				}
			}
		},
		navbar: {
			language_selector: {
				button: {
					label: 'Change language'
				}
			},
			theme_selector: {
				button: {
					label: 'Change theme'
				}
			},
			tabs: {
				home: 'Home',
				developers: 'Developers',
				creators: 'Creators',
				misc: 'Misc',
				about: 'About'
			},
			logo: {
				alt: 'ZyroHub Logo'
			}
		},
		toolkit: {
			navigation: {
				search: 'Search for a tool...'
			},
			related: {
				title: 'Related Tools'
			},
			tool: {
				provided: 'Powered by',
				connection: {
					error: {
						title: 'Connection Failed',
						description: 'Could not establish a connection with the server.',
						buttons: {
							try_again: 'Try Again',
							cancel: 'Cancel'
						}
					},
					loading: {
						description: 'Establishing connection with the server...'
					}
				},
				progress: {
					none: 'Waiting for execution...',
					pending: 'Initializing...',
					queued: 'In Queue: {position}',
					running: 'Running...',
					finished: 'Finished!',
					error: 'An error occurred!'
				},
				unselected: {
					description: 'Select a tool to continue.'
				},
				error: {
					title: 'An Error Occurred!',
					description: 'The tool you are trying to access may not exist or be unavailable at the moment.'
				}
			}
		},
		tools: {
			base64_text: {
				input: {
					label: 'Text',
					placeholder: 'Type your text here...'
				},
				output: {
					label: 'Base64 Text',
					placeholder: 'Text encoded in Base64...'
				}
			},
			base64_image: {
				input: {
					label: 'Base64 Text',
					placeholder: 'Image encoded in Base64...'
				},
				preview: {
					buttons: {
						download: 'Download',
						clear: 'Clear'
					}
				},
				no_image: {
					description: 'Drag and drop an image here.',
					or: 'or',
					upload: 'Select a File'
				}
			},
			bcrypt_generator: {
				input: {
					label: 'Password',
					placeholder: 'Type your password here...'
				},
				rounds: {
					label: 'Rounds'
				},
				generate: 'Generate Hash',
				output: {
					label: 'Hash Bcrypt',
					placeholder: 'Bcrypt generated hash...'
				}
			},
			bcrypt_checker: {
				password: {
					label: 'Password',
					placeholder: 'Type your password here...'
				},
				hash: {
					label: 'Bcrypt Hash',
					placeholder: 'Type the bcrypt hash here...'
				},
				validate: 'Validate Hash',
				result: {
					text: 'Result:',
					awaiting: 'AWAITING',
					running: 'RUNNING',
					error: 'FAILED',
					valid: 'MATCHED',
					invalid: 'INVALID MATCH'
				}
			},
			hash_generator: {
				text: {
					label: 'Text',
					placeholder: 'Type your text here...'
				},
				algorithm: 'Algorithm',
				generate: 'Generate Hash',
				output: {
					label: 'Hash Text',
					placeholder: 'Text generated hash...'
				}
			},
			image_converter: {
				format: 'Format',
				upload: 'Select a File',
				animated: 'Keep Animation (GIF, APNG, etc.)',
				items: {
					download: 'Download',
					remove: 'Remove'
				},
				bulk: {
					download: 'Download All',
					clear: 'Clear'
				}
			},
			image_pixelate: {
				pixel_size: 'Pixel Size',
				quantization: 'Quantization',
				quantization_count: 'Color Count',
				dithering: 'Dithering',
				output: {
					alt: 'Pixelated Image',
					download: 'Download',
					clear: 'Remove'
				},
				pixelate: 'Pixelate Image'
			},
			password_generator: {
				settings: {
					size: 'Size',
					ignore: 'Ignore Characters',
					uppers: 'Include Uppercase Letters',
					lowers: 'Include Lowercase Letters',
					numbers: 'Include Numbers',
					symbols: 'Include Symbols'
				},
				output: 'Generated Password'
			},
			password_strength_tester: {
				input: 'Password',
				conditions: {
					length: 'Minimum of 8 characters',
					uppercase: 'At least one uppercase letter',
					lowercase: 'At least one lowercase letter',
					number: 'At least one number',
					special: 'At least one special character'
				}
			},
			qrcode_generator: {
				personalization: 'Code Personalization',
				image_options: 'Attach Image',
				url_shorten: 'Shorten URL',
				options: {
					type: {
						label: 'Code Type',
						options: {
							text: 'Text',
							email: 'Email',
							sms: 'SMS',
							phone: 'Phone',
							vcard: 'Contact (VCard)',
							url: 'URL',
							wifi: 'Wi-Fi'
						}
					},
					content: {
						label: 'Content',
						placeholder: 'Enter the QR Code content...'
					},
					email: {
						label: 'Email',
						placeholder: 'Email'
					},
					email_subject: {
						label: 'Subject',
						placeholder: 'Email subject...'
					},
					email_body: {
						label: 'Email Body',
						placeholder: 'Email body...'
					},
					sms_phone: {
						label: 'Phone',
						placeholder: 'Phone number...'
					},
					sms_body: {
						label: 'SMS Body',
						placeholder: 'SMS body...'
					},
					phone: {
						label: 'Phone',
						placeholder: 'Phone number...'
					},
					vcard_first_name: {
						label: 'First Name',
						placeholder: 'First name'
					},
					vcard_last_name: {
						label: 'Last Name',
						placeholder: 'Last name'
					},
					vcard_cellphone: {
						label: 'Cellphone',
						placeholder: 'Cellphone number'
					},
					vcard_telephone: {
						label: 'Telephone',
						placeholder: 'Telephone number'
					},
					vcard_fax: {
						label: 'Fax',
						placeholder: 'Fax number'
					},
					vcard_email: {
						label: 'Email',
						placeholder: 'Email address'
					},
					vcard_company: {
						label: 'Company',
						placeholder: 'Company name'
					},
					vcard_company_job: {
						label: 'Job',
						placeholder: 'Job title'
					},
					vcard_city: {
						label: 'City',
						placeholder: 'City'
					},
					vcard_address: {
						label: 'Address',
						placeholder: 'Street address'
					},
					vcard_postal_code: {
						label: 'Postal Code',
						placeholder: 'Postal code'
					},
					vcard_state: {
						label: 'State',
						placeholder: 'State'
					},
					vcard_country: {
						label: 'Country',
						placeholder: 'Country'
					},
					vcard_website: {
						label: 'Website',
						placeholder: 'Website URL'
					},
					wifi_ssid: {
						label: 'Network Name (SSID)',
						placeholder: 'Network name'
					},
					wifi_password: {
						label: 'Network Password',
						placeholder: 'Network password'
					},
					wifi_encryption: {
						label: 'Encryption Type',
						options: {
							wpa: 'WPA/WPA2',
							wep: 'WEP',
							none: 'No Password'
						}
					},
					wifi_hidden: {
						label: 'Hidden Network'
					},
					dot_style: {
						label: 'Shape Style',
						options: {
							rounded: 'Rounded',
							extra_rounded: 'Extra Rounded',
							square: 'Square',
							dots: 'Dots',
							classy: 'Classy',
							classy_rounded: 'Classy Rounded'
						}
					},
					correction_level: {
						label: 'Error Correction Level',
						options: {
							l: 'Low (7%)',
							m: 'Medium (15%)',
							q: 'High (25%)',
							h: 'Maximum (30%)'
						}
					},
					margin: {
						label: 'Code Margin'
					},
					image_size: {
						label: 'Image Size'
					},
					image_margin: {
						label: 'Image Margin'
					},
					image_hide_background: {
						label: 'Hide Image Background'
					}
				},
				output: {
					download: 'Download',
					copy_image: 'Copy Image',
					copied_image: 'Image copied!',
					content: 'QR Code Content'
				}
			},
			text_counter: {
				content: {
					label: 'Text',
					placeholder: 'Type your text here...'
				},
				output: {
					characters: 'Characters',
					words: 'Words',
					paragraphs: 'Paragraphs',
					lines: 'Lines'
				}
			},
			text_to_slug: {
				input: {
					label: 'Text',
					placeholder: 'Type your text here...'
				},
				output: {
					label: 'Slug Text',
					placeholder: 'Text converted to slug...'
				}
			},
			uuid_generator: {
				version: 'Version',
				namespace: 'Namespace',
				generate: 'Generate',
				output: 'Generated UUID'
			},
			url_shortener: {
				url: {
					label: 'URL',
					placeholder: 'Enter the URL you want to shorten...'
				},
				shorten: 'Shorten URL',
				output: {
					label: 'Shortened URL',
					placeholder: 'Shortened URL...'
				}
			}
		}
	},
	pages: {
		meta: {
			description:
				'ZyroHub is a toolkit designed for developers, offering solutions for media conversion and manipulation. It includes a variety of essential tools, eliminating the need to install or rely on multiple software and services to accomplish common tasks.'
		},
		error: {
			meta: {
				title: 'Error {code}',
				description: 'An error occurred while trying to access the requested page.'
			},
			back: 'Back to Home',
			errors: {
				not_found: {
					title: 'Page Not Found',
					description: 'The page you are trying to access does not exist or is currently unavailable.'
				},
				default: {
					title: 'Oops! An error occurred.',
					description: 'Something went wrong while trying to access the requested page.'
				}
			}
		},
		home: {
			logo: {
				alt: 'ZyroHub Logo'
			},
			title: 'Welcome to',
			description: 'Please select an option below to get started.',
			toolkits: {
				dev: 'Developers',
				creators: 'Creators',
				misc: 'Misc'
			},
			about: 'ABOUT'
		},
		about: {
			meta: {
				title: 'About'
			},
			title: 'About ZyroHub',
			description: `
ZyroHub is a toolkit designed for developers, offering solutions for media conversion and manipulation. It includes a variety of essential tools, eliminating the need to install or rely on multiple software and services to accomplish common tasks.

It's a fully open-source project, aimed at providing a free and accessible platform for everyone. If you would like to contribute to the project, you can access the official repository on GitHub and submit your suggestions, corrections, or new tools.

If the project has been useful to you, consider making a donation to help keep the platform active, functional, and improving continuously. Any amount is welcome and will be used to cover the hosting and development costs of the platform.
`,
			contribute: 'Contribute'
		},
		developers: {
			meta: {
				title: 'Developers',
				description:
					'A set of essential tools for developers, offering solutions for common tasks such as text conversion, password generation, string encoding and decoding, and more.'
			},
			title: 'Developers'
		},
		misc: {
			meta: {
				title: 'Misc',
				description:
					'A set of diverse tools, offering solutions for common tasks such as mathematical calculations, unit conversion, QR code generation, and much more.'
			},
			title: 'Misc'
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

## User Commitment

The user undertakes to make appropriate use of the content and information that ZyroHub offers on the website and with an enunciative, but not limiting, character:

A) Not to engage in activities that are illegal or contrary to good faith and public services;
B) Not to disseminate propaganda or content of a racist, xenophobic nature, or related to gambling, any kind of illegal pornography, apology for terrorism or against human rights;
C) Not to cause damage to the physical (hardware) and logical (software) systems of ZyroHub, its suppliers, or third parties, to introduce or disseminate computer viruses or any other hardware or software systems that are capable of causing the aforementioned damage.

## More Information

We hope this is clear, and as mentioned earlier, if there is something that you aren't sure whether you need or not, it's usually safer to leave cookies enabled in case it interacts with one of the features you use on our website.
			`,
			date: '~ This policy is effective as of January 06, 2025.'
		}
	},
	tools: {
		base64_text: {
			name: 'Base64 Text',
			description: 'Encode and decode texts to Base64.'
		},
		base64_image: {
			name: 'Base64 Image',
			description: 'Encode and decode images to Base64.'
		},
		bcrypt_generator: {
			name: 'Bcrypt Generator',
			description: 'Generate password hashes using the bcrypt hashing algorithm.'
		},
		bcrypt_checker: {
			name: 'Bcrypt Checker',
			description: 'Check if a password matches a bcrypt hash.'
		},
		hash_generator: {
			name: 'Hash Generator',
			description:
				'Generate text hashes using different hashing algorithms. (MD5, SHA1, SHA256, SHA512, and others...)'
		},
		image_converter: {
			name: 'Image Converter',
			description: 'Convert images to different formats. (WebP, PNG, JPG and JPEG)'
		},
		image_pixelate: {
			name: 'Image Pixelate',
			description: 'Pixelate images to protect sensitive information.'
		},
		password_generator: {
			name: 'Password Generator',
			description: 'Generate random passwords with different security levels and settings.'
		},
		password_strength_tester: {
			name: 'Password Strength Tester',
			description: 'Test the strength of your passwords and see how secure they are.'
		},
		qrcode_generator: {
			name: 'QRCode Generator',
			description: 'Generate QR codes immediately with various customization options.'
		},
		text_counter: {
			name: 'Text Counter',
			description: 'Count characters, words, sentences, and paragraphs in a text.'
		},
		text_to_slug: {
			name: 'Text to Slug',
			description: 'Convert texts into a friendly format for URLs and identifiers.'
		},
		uuid_generator: {
			name: 'UUID Generator',
			description: 'Generate universally unique identifiers (UUID) of all versions for your applications.'
		},
		url_shortener: {
			name: 'URL Shortener',
			description: 'Shorten long URLs and share them easily.'
		}
	},
	workers: {
		image_converter: {
			progress: {
				converting_image: 'Converting image...'
			}
		},
		image_pixelate: {
			progress: {
				loading_image: 'Loading image...',
				starting_extra_processing: 'Starting extra processing...',
				applying_quantization_and_dithering: 'Applying quantization and dithering...',
				resizing_image: 'Resizing image...'
			}
		}
	}
};
