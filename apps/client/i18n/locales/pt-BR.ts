export default {
	locales: {
		en: 'Inglês',
		pt: 'Português Brasil'
	},
	components: {
		contributors: {
			github: 'Contribuidores no GitHub',
			buy_me_a_coffee: 'Apoiadores no Buy Me a Coffee',
			more: 'Ver Todos'
		},
		navbar: {
			tabs: {
				developers: 'Developers',
				creators: 'Creators',
				misc: 'Outros',
				about: 'Sobre'
			}
		},
		footer: {
			copy: 'Copyright © 2024 ZyroHub - Todos os direitos reservados.',
			privacy: 'Política de Privacidade'
		},
		inputs: {
			text_area: {
				copy: {
					default: 'Copiar',
					success: 'Copiado!'
				}
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
			image_converter: {
				upload: 'Selecione um Arquivo',
				bulk: {
					download: 'Baixar Todos',
					clear: 'Limpar'
				}
			}
		}
	},
	pages: {
		meta: {
			description:
				'ZyroHub é um toolkit desenhado para desenvolvedores, oferecendo soluções para conversão e manipulação de mídia. Inclui uma variedade de ferramentas essenciais, eliminando a necessidade de instalar ou depender de múltiplos softwares e serviços para realizar tarefas comuns.'
		},
		home: {
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
		image_converter: {
			name: 'Conversor de Imagens',
			description: 'Converta imagens para diferentes formatos diferentes. (WebP, PNG, JPG e JPEG)'
		},
		password_generator: {
			name: 'Gerador de Senhas',
			description: 'Gere senhas aleatórias com diferentes níveis de segurança e configurações.'
		}
	},
	workers: {}
};
