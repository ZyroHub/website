export default {
	locales: {
		en: 'English',
		pt: 'Português Brasil',
		es: 'Español'
	},
	components: {
		contributors: {
			github: 'Contribuidores de GitHub',
			buy_me_a_coffee: 'Patrocinadores de Buy Me a Coffee',
			more: 'Ver Todos'
		},
		footer: {
			copy: 'Derechos de autor © {year} ZyroHub - Todos los derechos reservados.',
			privacy: 'Política de Privacidad'
		},
		inputs: {
			image_box: {
				preview: {
					buttons: {
						download: 'Descargar',
						clear: 'Limpiar'
					}
				},
				no_image: {
					description: 'Arrastre y suelte una imagen aquí.',
					or: 'o',
					upload: 'Seleccione un Archivo'
				}
			},
			text_area: {
				copy: {
					default: 'Copiar',
					success: '¡Copiado!'
				}
			}
		},
		navbar: {
			language_selector: {
				button: {
					label: 'Cambiar idioma'
				}
			},
			theme_switcher: {
				button: {
					label: 'Cambiar tema'
				}
			},
			tabs: {
				home: 'Inicio',
				developers: 'Desarrolladores',
				creators: 'Creadores',
				misc: 'Misceláneo',
				about: 'Sobre'
			},
			logo: {
				alt: 'Logotipo de ZyroHub'
			}
		},
		toolkit: {
			navigation: {
				search: 'Buscar una herramienta...'
			},
			related: {
				title: 'Herramientas Relacionadas'
			},
			tool: {
				provided: 'Powered by',
				connection: {
					error: {
						title: 'Conexión Fallida',
						description: 'No se pudo establecer una conexión con el servidor.',
						buttons: {
							try_again: 'Intentar de Nuevo',
							cancel: 'Cancelar'
						}
					},
					loading: {
						description: 'Estableciendo conexión con el servidor...'
					}
				},
				progress: {
					none: 'Esperando ejecución...',
					pending: 'Inicializando...',
					queued: 'En Cola: {position}',
					running: 'Ejecutando...',
					finished: '¡Terminado!',
					error: '¡Ocurrió un error!'
				},
				unselected: {
					description: 'Seleccione una herramienta para continuar.'
				},
				error: {
					title: '¡Ocurrió un Error!',
					description:
						'La herramienta a la que intenta acceder puede no existir o no estar disponible en este momento.'
				}
			}
		},
		tools: {
			base64_text: {
				input: {
					label: 'Texto',
					placeholder: 'Escriba su texto aquí...'
				},
				output: {
					label: 'Texto Base64',
					placeholder: 'Texto codificado en Base64...'
				}
			},
			base64_image: {
				input: {
					label: 'Texto Base64',
					placeholder: 'Imagen codificada en Base64...'
				},
				preview: {
					buttons: {
						download: 'Descargar',
						clear: 'Limpiar'
					}
				},
				no_image: {
					description: 'Arrastre y suelte una imagen aquí.',
					or: 'o',
					upload: 'Seleccione un Archivo'
				}
			},
			bcrypt_generator: {
				input: {
					label: 'Contraseña',
					placeholder: 'Escriba su contraseña aquí...'
				},
				rounds: {
					label: 'Rondas'
				},
				generate: 'Generar Hash',
				output: {
					label: 'Hash Bcrypt',
					placeholder: 'Hash generado por Bcrypt...'
				}
			},
			bcrypt_checker: {
				password: {
					label: 'Contraseña',
					placeholder: 'Escriba su contraseña aquí...'
				},
				hash: {
					label: 'Hash Bcrypt',
					placeholder: 'Escriba el hash bcrypt aquí...'
				},
				validate: 'Validar Hash',
				result: {
					text: 'Resultado:',
					awaiting: 'ESPERANDO',
					running: 'EJECUTANDO',
					error: 'FALLIDO',
					valid: 'COINCIDE',
					invalid: 'NO COINCIDE'
				}
			},
			hash_generator: {
				text: {
					label: 'Texto',
					placeholder: 'Escriba su texto aquí...'
				},
				algorithm: 'Algoritmo',
				generate: 'Generar Hash',
				output: {
					label: 'Hash Generado',
					placeholder: 'Hash generado...'
				}
			},
			image_converter: {
				format: 'Formato',
				upload: 'Seleccione un Archivo',
				items: {
					download: 'Descargar',
					remove: 'Eliminar'
				},
				bulk: {
					download: 'Descargar Todo',
					clear: 'Limpiar'
				}
			},
			image_pixelate: {
				pixel_size: 'Tamaño del Pixel',
				quantization: 'Cuantización',
				quantization_count: 'Número de Colores',
				dithering: 'Dithering',
				output: {
					alt: 'Imagen Pixelada',
					download: 'Descargar',
					clear: 'Limpiar'
				},
				pixelate: 'Pixelar Imagen'
			},
			password_generator: {
				settings: {
					size: 'Tamaño',
					ignore: 'Ignorar Caracteres',
					uppers: 'Incluir Letras Mayúsculas',
					lowers: 'Incluir Letras Minúsculas',
					numbers: 'Incluir Números',
					symbols: 'Incluir Símbolos'
				},
				output: 'Contraseña Generada'
			},
			password_strength_tester: {
				input: 'Contraseña',
				conditions: {
					length: 'Mínimo de 8 caracteres',
					uppercase: 'Al menos una letra mayúscula',
					lowercase: 'Al menos una letra minúscula',
					number: 'Al menos un número',
					special: 'Al menos un carácter especial'
				}
			},
			qrcode_generator: {
				personalization: 'Personalización del Código',
				image_options: 'Opciones de Imagen',
				options: {
					type: {
						label: 'Tipo de Código',
						options: {
							text: 'Texto',
							email: 'Correo Electrónico',
							sms: 'SMS',
							phone: 'Teléfono',
							vcard: 'Contacto (VCard)',
							url: 'URL',
							wifi: 'Wi-Fi'
						}
					},
					content: {
						label: 'Contenido',
						placeholder: 'Ingrese el contenido del código QR...'
					},
					email: {
						label: 'Correo Electrónico',
						placeholder: 'Correo electrónico'
					},
					email_subject: {
						label: 'Asunto',
						placeholder: 'Asunto del correo...'
					},
					email_body: {
						label: 'Cuerpo del Correo',
						placeholder: 'Cuerpo del correo...'
					},
					sms_phone: {
						label: 'Teléfono',
						placeholder: 'Número de teléfono...'
					},
					sms_body: {
						label: 'Cuerpo del SMS',
						placeholder: 'Cuerpo del SMS...'
					},
					phone: {
						label: 'Teléfono',
						placeholder: 'Número de teléfono...'
					},
					vcard_first_name: {
						label: 'Nombre',
						placeholder: 'Nombre'
					},
					vcard_last_name: {
						label: 'Apellido',
						placeholder: 'Apellido'
					},
					vcard_cellphone: {
						label: 'Celular',
						placeholder: 'Número de celular'
					},
					vcard_telephone: {
						label: 'Teléfono',
						placeholder: 'Número de teléfono'
					},
					vcard_fax: {
						label: 'Fax',
						placeholder: 'Número de fax'
					},
					vcard_email: {
						label: 'Correo electrónico',
						placeholder: 'Dirección de correo'
					},
					vcard_company: {
						label: 'Empresa',
						placeholder: 'Nombre de la empresa'
					},
					vcard_company_job: {
						label: 'Cargo',
						placeholder: 'Título del cargo'
					},
					vcard_city: {
						label: 'Ciudad',
						placeholder: 'Ciudad'
					},
					vcard_address: {
						label: 'Dirección',
						placeholder: 'Dirección completa'
					},
					vcard_postal_code: {
						label: 'Código Postal',
						placeholder: 'Código postal'
					},
					vcard_state: {
						label: 'Estado',
						placeholder: 'Estado'
					},
					vcard_country: {
						label: 'País',
						placeholder: 'País'
					},
					vcard_website: {
						label: 'Sitio web',
						placeholder: 'URL del sitio web'
					},
					wifi_ssid: {
						label: 'Nombre de la Red (SSID)',
						placeholder: 'Nombre de la red'
					},
					wifi_password: {
						label: 'Contraseña de la Red',
						placeholder: 'Contraseña de la red'
					},
					wifi_encryption: {
						label: 'Tipo de Cifrado',
						options: {
							wpa: 'WPA/WPA2',
							wep: 'WEP',
							none: 'Sin Contraseña'
						}
					},
					wifi_hidden: {
						label: 'Red Oculta'
					},
					dot_style: {
						label: 'Estilo de los Puntos',
						options: {
							rounded: 'Redondeado',
							extra_rounded: 'Extra Redondeado',
							square: 'Cuadrado',
							dots: 'Puntos',
							classy: 'Elegante',
							classy_rounded: 'Elegante Redondeado'
						}
					},
					correction_level: {
						label: 'Nivel de Corrección de Errores',
						options: {
							l: 'Bajo (7%)',
							m: 'Medio (15%)',
							q: 'Alto (25%)',
							h: 'Máximo (30%)'
						}
					},
					margin: {
						label: 'Margen del Código'
					},
					image_size: {
						label: 'Tamaño de la Imagen'
					},
					image_margin: {
						label: 'Margen de la Imagen'
					},
					image_hide_background: {
						label: 'Ocultar Fondo de la Imagen'
					}
				},
				output: {
					download: 'Descargar',
					copy_image: 'Copiar Imagen',
					copied_image: '¡Imagen copiada!',
					content: 'Contenido del Código QR'
				}
			},
			text_to_slug: {
				input: {
					label: 'Texto',
					placeholder: 'Escriba su texto aquí...'
				},
				output: {
					label: 'Texto Slug',
					placeholder: 'Texto convertido a slug...'
				}
			},
			uuid_generator: {
				version: 'Versión',
				namespace: 'Espacio de Nombres',
				generate: 'Generar',
				output: 'UUID Generado'
			},
			url_shortener: {
				url: {
					label: 'URL',
					placeholder: 'Ingrese la URL que desea acortar...'
				},
				shorten: 'Acortar URL',
				output: {
					label: 'URL Acortada',
					placeholder: 'URL acortada...'
				}
			}
		}
	},
	pages: {
		meta: {
			description:
				'ZyroHub es un conjunto de herramientas diseñado para desarrolladores, que ofrece soluciones para la conversión y manipulación de medios. Incluye una variedad de herramientas esenciales, eliminando la necesidad de instalar o depender de múltiples software y servicios para realizar tareas comunes.'
		},
		error: {
			meta: {
				title: 'Error {code}',
				description: 'Ocurrió un error al intentar acceder a la página solicitada.'
			},
			back: 'Volver al Inicio',
			errors: {
				not_found: {
					title: 'Página No Encontrada',
					description: 'La página que intenta acceder no existe o no está disponible en este momento.'
				},
				default: {
					title: '¡Ocurrió un Error!',
					description: 'Algo salió mal al intentar acceder a la página solicitada.'
				}
			}
		},
		home: {
			logo: {
				alt: 'Logotipo de ZyroHub'
			},
			title: 'Bienvenido a',
			description: 'Seleccione una opción a continuación para comenzar.',
			toolkits: {
				dev: 'Desarrolladores',
				creators: 'Creadores',
				misc: 'Misceláneo'
			},
			about: 'Sobre'
		},
		about: {
			meta: {
				title: 'Sobre'
			},
			title: 'Acerca de ZyroHub',
			description: `
ZyroHub es un conjunto de herramientas diseñado para desarrolladores, que ofrece soluciones para la conversión y manipulación de medios. Incluye una variedad de herramientas esenciales, eliminando la necesidad de instalar o depender de múltiples software y servicios para realizar tareas comunes.

Es un proyecto completamente de código abierto, destinado a proporcionar una plataforma gratuita y accesible para todos. Si desea contribuir al proyecto, puede acceder al repositorio oficial en GitHub y enviar sus sugerencias, correcciones o nuevas herramientas.

Si el proyecto le ha sido útil, considere hacer una donación para ayudar a mantener la plataforma activa, funcional y en constante mejora. Cualquier cantidad es bienvenida y se utilizará para cubrir los costos de alojamiento y desarrollo de la plataforma.
`,
			contribute: 'Contribuir'
		},
		developers: {
			meta: {
				title: 'Desarrolladores',
				description:
					'Un conjunto de herramientas esenciales para desarrolladores, que ofrece soluciones para tareas comunes como la conversión de texto, generación de contraseñas, codificación y decodificación de cadenas, y más.'
			},
			title: 'Desarrolladores'
		},
		misc: {
			meta: {
				title: 'Misceláneo',
				description:
					'Un conjunto de herramientas diversas, que ofrece soluciones para tareas comunes como cálculos matemáticos, conversión de unidades, generación de códigos QR, y mucho más.'
			},
			title: 'Misceláneo'
		},
		creators: {
			meta: {
				title: 'Creadores',
				description:
					'Un conjunto de herramientas esenciales para creadores, que ofrece soluciones para tareas comunes como la conversión de imágenes, edición de videos, manipulación de audio, y más.'
			},
			title: 'Creadores'
		},
		privacy: {
			meta: {
				title: 'Política de Privacidad',
				description: 'Consulte nuestra política de privacidad y vea cómo protegemos su información.'
			},
			content: `
# Política de Privacidad

Su privacidad es importante para nosotros. Es política de ZyroHub respetar su privacidad con respecto a cualquier información que podamos recopilar en el sitio web [ZyroHub](https://zyrohub.app), y otros sitios que poseemos y operamos.

Solo retenemos la información recopilada durante el tiempo necesario para proporcionarle su servicio solicitado. Cuando almacenamos datos, los protegemos dentro de medios comercialmente aceptables para evitar pérdidas y robos, así como el acceso, divulgación, copia, uso o modificación no autorizados.

No compartimos ninguna información de identificación personal públicamente o con terceros, excepto cuando lo exige la ley.

Nuestro sitio web puede enlazar a sitios externos que no son operados por nosotros. Tenga en cuenta que no tenemos control sobre el contenido y las prácticas de estos sitios, y no podemos aceptar responsabilidad o obligación por sus respectivas políticas de privacidad.

Su uso continuado de nuestro sitio web se considerará como aceptación de nuestras prácticas en torno a la privacidad y la información personal. Si tiene alguna pregunta sobre cómo manejamos los datos de los usuarios y la información personal, no dude en contactarnos.

## Compromiso del Usuario

El usuario se compromete a hacer un uso adecuado de los contenidos e información que ZyroHub ofrece en el sitio web y con carácter enunciativo, pero no limitativo:

A) No realizar actividades que sean ilegales o contrarias a la buena fe y al orden público;
B) No difundir propaganda o contenido de carácter racista, xenófobo, o relacionado con el juego de azar, cualquier tipo de pornografía ilegal, apología del terrorismo o contra los derechos humanos;
C) No causar daños a los sistemas físicos (hardware) y lógicos (software) de ZyroHub, sus proveedores o terceros, para introducir o difundir virus informáticos o cualquier otro sistema de hardware o software que sea capaz de causar los daños mencionados anteriormente.

## Más Información

Esperamos que esto sea claro, y como se mencionó anteriormente, si hay algo de lo que no está seguro si necesita o no, generalmente es más seguro dejar las cookies habilitadas en caso de que interactúe con una de las funciones que utiliza en nuestro sitio web.
			`,
			date: '~ Esta política es efectiva a partir del 06 de enero de 2025.'
		}
	},
	tools: {
		base64_text: {
			name: 'Texto Base64',
			description: 'Codificar y decodificar textos a Base64.'
		},
		base64_image: {
			name: 'Imagen Base64',
			description: 'Codificar y decodificar imágenes a Base64.'
		},
		bcrypt_generator: {
			name: 'Generador Bcrypt',
			description: 'Generar hashes de contraseñas utilizando el algoritmo de hash bcrypt.'
		},
		bcrypt_checker: {
			name: 'Verificador Bcrypt',
			description: 'Verificar si una contraseña coincide con un hash bcrypt.'
		},
		hash_generator: {
			name: 'Generador de Hash',
			description:
				'Generar hashes de textos utilizando diferentes algoritmos de hash. (MD5, SHA1, SHA256, SHA512, entre otros...)'
		},
		image_converter: {
			name: 'Convertidor de Imágenes',
			description: 'Convertir imágenes a diferentes formatos. (WebP, PNG, JPG y JPEG)'
		},
		image_pixelate: {
			name: 'Pixelar Imagen',
			description: 'Aplicar un efecto de pixelado a imágenes.'
		},
		password_generator: {
			name: 'Generador de Contraseñas',
			description: 'Generar contraseñas aleatorias con diferentes niveles de seguridad y configuraciones.'
		},
		password_strength_tester: {
			name: 'Probador de Contraseñas',
			description: 'Verificar la seguridad de sus contraseñas utilizando diferentes métricas.'
		},
		qrcode_generator: {
			name: 'Generador de Código QR',
			description: 'Genere códigos QR inmediatamente con varias opciones de personalización.'
		},
		text_to_slug: {
			name: 'Texto a Slug',
			description: 'Convertir textos en un formato amigable para URLs e identificadores.'
		},
		uuid_generator: {
			name: 'Generador de UUID',
			description:
				'Generar identificadores únicos universales (UUID) de todas las versiones para sus aplicaciones.'
		},
		url_shortener: {
			name: 'Acortador de URL',
			description: 'Acortar URLs largas para compartir fácilmente.'
		}
	},
	workers: {
		image_pixelate: {
			progress: {
				loading_image: 'Cargando imagen...',
				starting_extra_processing: 'Iniciando procesamiento extra...',
				applying_quantization_and_dithering: 'Aplicando cuantización y dithering...',
				resizing_image: 'Redimensionando imagen...'
			}
		}
	}
};
