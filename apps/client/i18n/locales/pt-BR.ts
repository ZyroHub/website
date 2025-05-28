export default {
	locales: {
		en: 'English',
		pt: 'Português Brasil',
		es: 'Español'
	},
	components: {
		contributors: {
			github: 'Contribuidores no GitHub',
			buy_me_a_coffee: 'Apoiadores no Buy Me a Coffee',
			more: 'Ver Todos'
		},
		footer: {
			copy: 'Copyright © {year} ZyroHub - Todos os direitos reservados.',
			privacy: 'Política de Privacidade'
		},
		inputs: {
			image_box: {
				preview: {
					buttons: {
						download: 'Download',
						clear: 'Remover'
					}
				},
				no_image: {
					description: 'Arraste e solte uma imagem.',
					or: 'ou',
					upload: 'Selecione um Arquivo'
				}
			},
			text_area: {
				copy: {
					default: 'Copiar',
					success: 'Copiado!'
				}
			}
		},
		navbar: {
			language_selector: {
				button: {
					label: 'Alterar idioma'
				}
			},
			tabs: {
				home: 'Início',
				developers: 'Developers',
				creators: 'Creators',
				misc: 'Outros',
				about: 'Sobre'
			},
			logo: {
				alt: 'Logotipo do ZyroHub'
			}
		},
		toolkit: {
			navigation: {
				search: 'Pesquisar ferramenta...'
			},
			related: {
				title: 'Ferramentas Relacionadas'
			},
			tool: {
				provided: 'Powered by',
				connection: {
					error: {
						title: 'Falha na Conexão',
						description: 'Não foi possível estabelecer conexão com o servidor.',
						buttons: {
							try_again: 'Tentar Novamente',
							cancel: 'Cancelar'
						}
					},
					loading: {
						description: 'Estabelecendo conexão com o servidor...'
					}
				},
				progress: {
					none: 'Aguardando execução...',
					pending: 'Inicializando...',
					queued: 'Na Fila: {position}',
					running: 'Executando...',
					finished: 'Concluído!',
					error: 'Ocorreu um erro!'
				},
				unselected: {
					description: 'Selecione alguma ferramenta para continuar.'
				},
				error: {
					title: 'Ocorreu um Erro!',
					description:
						'A ferramenta que você está tentando acessar pode não existir ou estar indisponível no momento.'
				}
			}
		},
		tools: {
			base64_text: {
				input: {
					label: 'Texto',
					placeholder: 'Digite seu texto aqui...'
				},
				output: {
					label: 'Texto Base64',
					placeholder: 'Texto codificado em Base64...'
				}
			},
			base64_image: {
				input: {
					label: 'Texto Base64',
					placeholder: 'Imagem codificada em Base64...'
				},
				preview: {
					buttons: {
						download: 'Download',
						clear: 'Cancelar'
					}
				},
				no_image: {
					description: 'Arraste e solte uma imagem.',
					or: 'ou',
					upload: 'Selecione um Arquivo'
				}
			},
			bcrypt_generator: {
				input: {
					label: 'Senha',
					placeholder: 'Digite sua senha...'
				},
				rounds: {
					label: 'Rounds'
				},
				generate: 'Gerar Hash',
				output: {
					label: 'Hash Bcrypt',
					placeholder: 'Hash gerado com Bcrypt...'
				}
			},
			bcrypt_checker: {
				password: {
					label: 'Senha',
					placeholder: 'Digite sua senha...'
				},
				hash: {
					label: 'Hash Bcrypt',
					placeholder: 'Digite o hash Bcrypt...'
				},
				validate: 'Verificar Hash',
				result: {
					text: 'Resultado:',
					awaiting: 'AGUARDANDO',
					running: 'VERIFICANDO',
					error: 'FALHOU',
					valid: 'CORRESPONDENTE',
					invalid: 'NÃO CORRESPONDEM'
				}
			},
			hash_generator: {
				text: {
					label: 'Texto',
					placeholder: 'Digite seu texto aqui...'
				},
				algorithm: 'Algoritmo',
				generate: 'Gerar Hash',
				output: {
					label: 'Hash Gerado',
					placeholder: 'Hash gerado...'
				}
			},
			image_converter: {
				format: 'Formato',
				upload: 'Selecione um Arquivo',
				items: {
					download: 'Baixar',
					remove: 'Remover'
				},
				bulk: {
					download: 'Baixar Todos',
					clear: 'Limpar'
				}
			},
			image_pixelate: {
				pixel_size: 'Tamanho do Pixel',
				quantization: 'Quantização',
				quantization_count: 'Contagem de Cores',
				dithering: 'Dithering',
				output: {
					alt: 'Imagem Pixelada',
					download: 'Download',
					clear: 'Remover'
				},
				pixelate: 'Pixelar Imagem'
			},
			password_generator: {
				settings: {
					size: 'Tamanho da Senha',
					ignore: 'Ignorar Caracteres',
					uppers: 'Incluir Letras Maiúsculas',
					lowers: 'Incluir Letras Minúsculas',
					numbers: 'Incluir Números',
					symbols: 'Incluir Caracteres Especiais'
				},
				output: 'Senha Gerada'
			},
			password_strength_tester: {
				input: 'Senha',
				conditions: {
					length: 'Mínimo de 8 caracteres',
					uppercase: 'Pelo menos uma letra maiúscula',
					lowercase: 'Pelo menos uma letra minúscula',
					number: 'Pelo menos um número',
					special: 'Pelo menos um caractere especial'
				}
			},
			qrcode_generator: {
				personalization: 'Personalização do Código',
				image_options: 'Opções de Imagem',
				options: {
					type: {
						label: 'Tipo de Código',
						options: {
							text: 'Texto',
							email: 'E-mail',
							sms: 'SMS',
							phone: 'Telefone',
							vcard: 'Contato (VCard)',
							url: 'URL',
							wifi: 'Wi-Fi'
						}
					},
					content: {
						label: 'Conteúdo',
						placeholder: 'Digite o conteúdo do QR Code...'
					},
					email: {
						label: 'E-mail',
						placeholder: 'E-mail'
					},
					email_subject: {
						label: 'Assunto',
						placeholder: 'Assunto do email...'
					},
					email_body: {
						label: 'Corpo do E-mail',
						placeholder: 'Corpo do e-mail...'
					},
					sms_phone: {
						label: 'Telefone',
						placeholder: 'Número do telefone...'
					},
					sms_body: {
						label: 'Corpo do SMS',
						placeholder: 'Corpo do SMS...'
					},
					phone: {
						label: 'Telefone',
						placeholder: 'Número do telefone...'
					},
					vcard_first_name: {
						label: 'Nome',
						placeholder: 'Nome'
					},
					vcard_last_name: {
						label: 'Sobrenome',
						placeholder: 'Sobrenome'
					},
					vcard_cellphone: {
						label: 'Celular',
						placeholder: 'Número do celular'
					},
					vcard_telephone: {
						label: 'Telefone',
						placeholder: 'Número de telefone'
					},
					vcard_fax: {
						label: 'Fax',
						placeholder: 'Número de fax'
					},
					vcard_email: {
						label: 'Email',
						placeholder: 'Endereço de email'
					},
					vcard_company: {
						label: 'Empresa',
						placeholder: 'Nome da empresa'
					},
					vcard_company_job: {
						label: 'Cargo',
						placeholder: 'Título do cargo'
					},
					vcard_city: {
						label: 'Cidade',
						placeholder: 'Cidade'
					},
					vcard_address: {
						label: 'Endereço',
						placeholder: 'Endereço completo'
					},
					vcard_postal_code: {
						label: 'Código Postal (CEP)',
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
						label: 'Site',
						placeholder: 'URL do site'
					},
					wifi_ssid: {
						label: 'Nome da Rede (SSID)',
						placeholder: 'Nome da Rede'
					},
					wifi_password: {
						label: 'Senha da Rede',
						placeholder: 'Senha da Rede'
					},
					wifi_encryption: {
						label: 'Tipo de Criptografia',
						options: {
							wpa: 'WPA/WPA2',
							wep: 'WEP',
							none: 'Sem Senha'
						}
					},
					wifi_hidden: {
						label: 'Rede Oculta'
					},
					dot_style: {
						label: 'Estilo das Formas',
						options: {
							rounded: 'Arredondado',
							extra_rounded: 'Extra Arredondado',
							square: 'Quadrado',
							dots: 'Pontos',
							classy: 'Classy',
							classy_rounded: 'Classy Arredondado'
						}
					},
					correction_level: {
						label: 'Nível de Correção de Erros',
						options: {
							l: 'Baixo (7%)',
							m: 'Médio (15%)',
							q: 'Alto (25%)',
							h: 'Máximo (30%)'
						}
					},
					margin: {
						label: 'Margem do Código'
					},
					image_size: {
						label: 'Tamanho da Imagem'
					},
					image_margin: {
						label: 'Margem da Imagem'
					},
					image_hide_background: {
						label: 'Ocultar Fundo da Imagem'
					}
				},
				output: {
					download: 'Download',
					copy_image: 'Copiar Imagem',
					copied_image: 'Imagem copiada!',
					content: 'Conteúdo do QR Code'
				}
			},
			text_to_slug: {
				input: {
					label: 'Texto',
					placeholder: 'Digite seu texto aqui...'
				},
				output: {
					label: 'Slug',
					placeholder: 'Texto convertido para slug...'
				}
			},
			uuid_generator: {
				version: 'Versão',
				namespace: 'Namespace',
				generate: 'Gerar',
				output: 'UUID Gerado'
			},
			url_shortener: {
				url: {
					label: 'URL',
					placeholder: 'Digite a URL que deseja encurtar...'
				},
				generate: 'Encurtar URL',
				output: {
					label: 'URL Encurtada',
					placeholder: 'URL encurtada...'
				}
			}
		}
	},
	pages: {
		meta: {
			description:
				'ZyroHub é um toolkit desenhado para desenvolvedores, oferecendo soluções para conversão e manipulação de mídia. Inclui uma variedade de ferramentas essenciais, eliminando a necessidade de instalar ou depender de múltiplos softwares e serviços para realizar tarefas comuns.'
		},
		error: {
			meta: {
				title: 'Error {code}',
				description: 'Ocorreu um erro ao tentar acessar a página solicitada.'
			},
			back: 'Voltar para o Início',
			errors: {
				not_found: {
					title: 'Página Não Encontrada',
					description: 'A página que você está tentando acessar não existe ou está indisponível no momento.'
				},
				default: {
					title: 'Oops! Um erro ocorreu.',
					description: 'Algo deu errado ao tentar acessar a página solicitada.'
				}
			}
		},
		home: {
			logo: {
				alt: 'Logotipo do ZyroHub'
			},
			title: 'Bem-Vindo ao',
			description: 'Por favor selecione uma das opções abaixo para começar.',
			toolkits: {
				dev: 'Developers',
				creators: 'Creators',
				misc: 'Outros'
			},
			about: 'SOBRE'
		},
		about: {
			meta: {
				title: 'Sobre'
			},
			title: 'Sobre o ZyroHub',
			description: `
ZyroHub é um toolkit desenhado para desenvolvedores, oferecendo soluções para conversão e manipulação de mídia. Inclui uma variedade de ferramentas essenciais, eliminando a necessidade de instalar ou depender de múltiplos softwares e serviços para realizar tarefas comuns.

É um projeto totalmente open-source, com o intuito de fornecer uma plataforma gratuita e acessível para todos. Se você gostaria de contribuir com o projeto, você pode acessar o repositório oficial no GitHub e enviar suas sugestões, correções ou novas ferramentas.

Se o projeto foi útil para você, considere fazer uma doação para ajudar a manter a plataforma ativa, funcional e melhor cada vez mais. Qualquer valor é bem-vindo e será utilizado para cobrir os custos de hospedagem e desenvolvimento da plataforma.
`,
			contribute: 'Contribuir'
		},
		developers: {
			meta: {
				title: 'Desenvolvedores',
				description:
					'Conjunto de ferramentas essenciais para desenvolvedores, oferecendo soluções para tarefas comuns, como conversão de texto, geração de senhas, codificação e decodificação de strings, e muito mais.'
			},
			title: 'Developers'
		},
		creators: {
			meta: {
				title: 'Creators',
				description:
					'Conjunto de ferramentas essenciais para criadores, oferecendo soluções para tarefas comuns, como conversão de mídia, manipulação de imagens, edição de vídeos, e muito mais.'
			},
			title: 'Creators'
		},
		misc: {
			meta: {
				title: 'Outros',
				description:
					'Conjunto de ferramentas diversas, oferecendo soluções para tarefas comuns, como cálculos matemáticos, conversão de unidades, geração de QR Codes, e muito mais.'
			},
			title: 'Outros'
		},
		privacy: {
			meta: {
				title: 'Política de Privacidade',
				description: 'Confira nossa política de privacidade e saiba como protegemos suas informações.'
			},
			content: `
# Política de Privacidade

A sua privacidade é importante para nós. É política do ZyroHub respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site [ZyroHub](https://zyrohub.app), e outros sites que possuímos e operamos.

Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.

Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.

O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.

O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.

## Compromisso do Usuário

O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o ZyroHub oferece no site e com caráter enunciativo, mas não limitativo:

	A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;
	B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
	C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do ZyroHub, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.

## Mais informações

Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
			`,
			date: '~ Esta política é efetiva a partir do dia 06 de Janeiro de 2025.'
		}
	},
	tools: {
		base64_text: {
			name: 'Texto Base64',
			description: 'Codifique e decodifique textos para Base64.'
		},
		base64_image: {
			name: 'Imagem Base64',
			description: 'Codifique e decodifique imagens para Base64.'
		},
		bcrypt_generator: {
			name: 'Gerador Bcrypt',
			description: 'Gere hash de senhas utilizando o algoritmo de hash bcrypt.'
		},
		bcrypt_checker: {
			name: 'Verificador Bcrypt',
			description: 'Verifique se uma senha corresponde a um hash bcrypt.'
		},
		hash_generator: {
			name: 'Gerador de Hash',
			description:
				'Gere hash de textos utilizando diferentes algoritmos de hash. (MD5, SHA1, SHA256, SHA512, entre outros...)'
		},
		image_converter: {
			name: 'Conversor de Imagens',
			description: 'Converta imagens para diferentes formatos diferentes. (WebP, PNG, JPG e JPEG)'
		},
		image_pixelate: {
			name: 'Pixelar Imagem',
			description: 'Aplique um efeito de pixelização em suas imagens.'
		},
		password_generator: {
			name: 'Gerador de Senhas',
			description: 'Gere senhas aleatórias com diferentes níveis de segurança e configurações.'
		},
		password_strength_tester: {
			name: 'Validador de Senhas',
			description: 'Teste a força de suas senhas e obtenha sugestões para melhorá-las.'
		},
		qrcode_generator: {
			name: 'Gerador de QRCode',
			description: 'Gere códigos qr imediatamente com várias opções de customização.'
		},
		text_to_slug: {
			name: 'Texto para Slug',
			description: 'Converta textos em um formato amigável para URLs e identificadores.'
		},
		uuid_generator: {
			name: 'Gerador UUID',
			description: 'Gere identificadores únicos universais (UUID) de todas as versões para suas aplicações.'
		},
		url_shortener: {
			name: 'Encurtador de Links',
			description: 'Encurte links longos para facilitar o compartilhamento e o uso.'
		}
	},
	workers: {
		image_pixelate: {
			progress: {
				loading_image: 'Carregando imagem...',
				starting_extra_processing: 'Iniciando processamento extra...',
				applying_quantization_and_dithering: 'Aplicando quantização e dithering...',
				resizing_image: 'Redimensionando imagem...'
			}
		}
	}
};
