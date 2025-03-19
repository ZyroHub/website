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
			text_area: {
				copy: {
					default: 'Copiar',
					success: '¡Copiado!'
				}
			}
		},
		navbar: {
			tabs: {
				developers: 'Desarrolladores',
				creators: 'Creadores',
				misc: 'Misceláneo',
				about: 'Sobre'
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
				upload: 'Seleccione un Archivo',
				bulk: {
					download: 'Descargar Todo',
					clear: 'Limpiar'
				}
			},
			password_generator: {
				settings: {
					size: 'Tamaño',
					ignore: 'Ignorar Caracteres',
					letters: 'Incluir Letras',
					numbers: 'Incluir Números',
					symbols: 'Incluir Símbolos'
				},
				output: 'Contraseña Generada'
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
		password_generator: {
			name: 'Generador de Contraseñas',
			description: 'Generar contraseñas aleatorias con diferentes niveles de seguridad y configuraciones.'
		},
		password_strength_tester: {
			name: 'Probador de Contraseñas',
			description: 'Verificar la seguridad de sus contraseñas utilizando diferentes métricas.'
		},
		text_to_slug: {
			name: 'Texto a Slug',
			description: 'Convertir textos en un formato amigable para URLs e identificadores.'
		},
		uuid_generator: {
			name: 'Generador de UUID',
			description:
				'Generar identificadores únicos universales (UUID) de todas las versiones para sus aplicaciones.'
		}
	},
	workers: {}
};
