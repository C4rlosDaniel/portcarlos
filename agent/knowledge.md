# Base de Conhecimento — Portfólio de Carlos Daniel Alencar

<!-- GERADO AUTOMATICAMENTE por scripts/gen-knowledge.mjs — não editar à mão.
     Fonte: src/data/*.ts. Regenerar com: npm run knowledge -->

Fonte oficial de verdade sobre o profissional. Não inventar informações fora desta base.

## Perfil

- **Nome:** Carlos Daniel da Silva Alencar
- **Cargo/atuacao:** Analista de Sistemas & Automação
- **Localizacao:** Pirassununga, SP — Brasil
- **Quem sou:** Sou estudante de Ciência da Computação (FATECE, previsão de conclusão em 12/2028) e atuo com suporte técnico, infraestrutura de TI e desenvolvimento de sistemas web.
- **Onde atuo:** Sou Analista de Sistemas na My Fly, empresa de automação comercial em Pirassununga. Antes, como estagiário de TI no Clube Pirassununga (mar–set/2026), desenvolvi os sistemas ClubeON, ClubStrategy e Clubingo.
- **Como eu trabalho:** Parto do problema real da operação: observo o processo manual, modelo os dados e entrego algo simples que funciona. Nos sistemas que implantei no Clube Pirassununga e na My Fly usei Supabase (PostgreSQL + Realtime), JavaScript, Vercel e PWA — do painel que sincroniza TVs em tempo real ao sorteador de bingo que roda no celular. Melhoro de olho no feedback de quem usa e automatizo o que sobra com webhooks, APIs e n8n.
- **IA como ferramenta:** Uso ferramentas de IA (como Antigravity) para acelerar o desenvolvimento e a automação, mas reviso, testo e entendo o que vai para produção.
- **Além do código:** Sou monitor e professor de Informática e Pacote Office na FATECE, e tenho passagem pelo Exército Brasileiro como técnico de TI, o que me deu disciplina e trabalho sob pressão.
- **Idiomas:** Português (nativo), inglês (avançado, C1), francês (avançado, C1) e espanhol (intermediário, B1). Estou aprendendo alemão.

## Links

- LinkedIn: https://www.linkedin.com/in/carlos-alencar-22b950353
- GitHub: https://github.com/C4rlosDaniel
- Instagram: https://www.instagram.com/c4rl0s.alenc4r/
- Site (este portfólio): https://portcarlos.vercel.app
- Repositorio: https://github.com/C4rlosDaniel/portcarlos

## Experiencia profissional

### Analista de Sistemas — My Fly Automação Comercial (Out/2026 – atual)

- Local: Pirassununga, SP
- Desenvolvimento, manutenção e evolução de sistemas alinhados às necessidades dos clientes e aos processos de negócio.
- Automação de processos e rotinas para reduzir tarefas manuais e aumentar a eficiência dos sistemas.
- Análise de requisitos, integração e suporte a sistemas, identificando problemas e implementando melhorias.

### Estagiário de TI — Suporte e Infraestrutura — Clube Pirassununga (Mar/2026 – Set/2026)

- Local: Pirassununga, SP
- Desenvolvi o ClubeON CCP, que automatizou a distribuição de conteúdos corporativos para TVs, monitores e dispositivos conectados com sincronização em tempo real, substituindo atualizações manuais.
- Também desenvolvi o ClubStrategy e o Clubingo para o clube.
- Instalação, configuração e manutenção de equipamentos de informática, controle de inventário e melhorias tecnológicas.

### Professor de Informática e Pacote Office — Monitoria Acadêmica — FATECE (Abr/2026 – Out/2026)

- Local: Pirassununga, SP
- Planejamento e condução de aulas de Informática e Pacote Office.
- Suporte individual e coletivo a alunos, desenvolvendo didática, comunicação e liderança.

### Técnico de Campo de T.I (Freelancer) — Vexus I.T (Set/2025 – Set/2026)

- Local: São Paulo (presencial)
- Atendimento técnico presencial a empresas parceiras: diagnóstico e resolução de incidentes de hardware, software e redes.
- Instalação, configuração e manutenção de equipamentos e sistemas.

### Estagiário de Suporte Bilíngue (Inglês e Francês) — Teleperformance (Mar/2025 – Fev/2026)

- Local: São Paulo (remoto)
- Suporte técnico bilíngue a usuários internos: incidentes de hardware, software e conectividade.
- Configuração, atualização e manutenção de estações de trabalho, periféricos e aplicações corporativas.

### Técnico de T.I (Serviço Militar) — Exército Brasileiro — 13º RCMEC (Mar/2024 – Fev/2025)

- Local: Pirassununga, SP
- Suporte de TI a setores internos: configuração de equipamentos, manutenção básica e demandas técnicas do dia a dia.
- Atuação nas áreas administrativa e jurídica: gestão de documentos, organização de processos e apoio na elaboração de relatórios.

### Tradutor Freelancer (temporário) — OpenSenses — Acessibilidade Comunicacional (Fev/2021 – Jan/2022)

- Local: São Paulo
- Tradução de documentos, reuniões e materiais técnicos em inglês, com precisão e consistência terminológica.
- Suporte linguístico a equipes internas e clientes, com foco em comunicação clara.

## Formacao

- **Bacharelado em Ciência da Computação** — FATECE, Pirassununga — SP (03/2025 – previsão 12/2028)
- **Técnico em Eletrônica** — ETEC, Pirassununga — SP (Jul/2023 – Dez/2024)

## Certificacoes

- Criando um Projeto com Interface Gráfica utilizando a linguagem Python
- Certificado de Extensão Universitário
- Fundamentos da Engenharia de Software — Faculdade Metropolitana
- Segurança em Tecnologia da Informação — Faculdade Metropolitana
- Lógica de Programação em Python Developer
- Crie um site simples usando HTML, CSS e JavaScript
- Introdução à Análise de Dados — Microsoft Power BI

## Projetos

### ClubeON — Transmissão Digital (slug: clubeon)

- Resumo: Sistema oficial de transmissão digital do Clube Pirassununga.
- Papel: Desenvolvimento e implantação
- Periodo: 2026
- Categoria: sistemas
- Stack: PostgreSQL, Supabase, JavaScript, IA no desenvolvimento
- Link: https://clubeon.clubepirassununga.com.br
- Problema: Os conteúdos exibidos nas TVs e monitores do clube eram atualizados manualmente, tela por tela.
- Solucao: Uma plataforma centralizada: o administrador publica o conteúdo uma vez e os terminais (TVs, monitores e dispositivos conectados) sincronizam em tempo real.
- Decisoes:
  - Supabase (PostgreSQL + Realtime) para publicar o conteúdo uma vez e os terminais sincronizarem sozinhos
  - JavaScript puro no painel e no terminal, para rodar em TVs e dispositivos simples sem instalar app
  - Três perfis de acesso — administrador, terminal de exibição e usuário — separando quem publica de quem só exibe
  - Editor com layouts prontos (tela cheia, SplitScreen e faixa de notícias) reaproveitando uma biblioteca de mídias
  - IA no desenvolvimento para acelerar a entrega, com revisão manual do que vai a produção
- Resultado: Conteúdo publicado uma vez passa a valer para todos os terminais, no lugar da atualização manual tela por tela.

### ClubStrategy — Gestão de Turmas (slug: clubstrategy)

- Resumo: Dashboard de turmas e listas de espera das aulas do Clube Pirassununga.
- Papel: Desenvolvimento e implantação
- Periodo: 2026
- Categoria: sistemas
- Stack: PostgreSQL, Supabase, JavaScript
- Link: https://clubstrategy.clubepirassununga.com.br
- Problema: Controle de alunos matriculados, lista de espera e turmas lotadas sem uma visão única.
- Solucao: Dashboard com alunos matriculados, lista de espera, turmas lotadas e resumo por modalidade.
- Decisoes:
  - Supabase (PostgreSQL) como fonte única de matrículas, lista de espera e turmas, no lugar de planilhas dispersas
  - Consultas agregadas no banco (por modalidade e status) para o dashboard abrir rápido
  - Tela única com matriculados, lista de espera e turmas lotadas, dando visão imediata da ocupação
  - Front-end web em JavaScript puro, acessível de qualquer navegador da secretaria
- Resultado: Painel único no lugar do controle disperso — visão imediata de matrículas, lista de espera e turmas lotadas.

### Clubingo — Conferência de Bingo (slug: clubingo)

- Resumo: Sorteador e conferentes sincronizados em tempo real.
- Papel: Desenvolvimento e implantação
- Periodo: 2026
- Categoria: sistemas
- Stack: Vercel, PWA, Supabase (realtime)
- Link: https://clubingo.vercel.app
- Problema: A conferência das cartelas era manual e lenta durante o evento.
- Solucao: Sistema de bingo com sincronização em tempo real entre o sorteador e os conferentes, instalável no celular (PWA).
- Decisoes:
  - Supabase Realtime para o número sorteado chegar aos conferentes no mesmo instante, sem recarregar a tela
  - PWA instalável no celular, evitando depender de loja de aplicativos durante o evento
  - Papéis separados (sorteador e conferente) com saída protegida por senha, para ninguém encerrar a sessão por engano
  - Layout responsivo que serve tanto na vertical quanto na horizontal do celular do conferente
  - Build estático na Vercel, mantendo a página leve com a sincronização por conta do Supabase
- Resultado: A conferência acompanha o sorteio em tempo real, substituindo a checagem manual das cartelas.

### My Fly — Landing page (slug: myfly)

- Resumo: Site institucional da empresa de automação comercial onde atuo como Analista de Sistemas (PJ).
- Papel: Analista de Sistemas (PJ) — desenvolvimento da landing page
- Periodo: 2026
- Categoria: landing
- Stack: React, Vite, Tailwind CSS, Framer Motion, lucide-react, SEO local, Vercel
- Link: https://myfly.vercel.app
- Problema: A empresa precisava apresentar suas soluções (Food Service, FlyERP e unificação de vendas, financeiro, contratos e notas fiscais) e captar contatos.
- Solucao: Landing page responsiva com foco em conversão para o WhatsApp, SEO local (Pirassununga/SP) e identidade visual escura.
- Decisoes:
  - React + Vite para páginas rápidas e build estático publicado na Vercel
  - Tailwind CSS para aplicar a identidade visual escura de forma consistente
  - Framer Motion nas animações de entrada e lucide-react nos ícones
  - SEO local (Pirassununga/SP): meta tags, Open Graph e conversão direta para o WhatsApp
- Resultado: nao informado na base.

### Lume Estamparia — Landing page (slug: lume)

- Resumo: Modelo de landing page para estamparia (marca fictícia) — catálogo com abas, bastidores e orçamento via WhatsApp.
- Papel: Design e desenvolvimento front-end completo (modelo conceitual)
- Periodo: 2026
- Categoria: landing
- Stack: HTML, CSS, JavaScript, Google Fonts, Vercel
- Link: https://modelolanding.vercel.app
- Problema: Empresa fictícia de estamparia precisava de um site que apresentasse produtos, processo de produção e bastidores, e captasse pedidos de orçamento.
- Solucao: Landing page estática e responsiva com catálogo por abas, galeria de bastidores, depoimentos e formulário que monta a mensagem e abre o WhatsApp — sem backend.
- Decisoes:
  - HTML, CSS e JavaScript puros (sem framework) para página leve e sem etapa de build
  - Abas de catálogo e animações de revelação on scroll em JavaScript vanilla
  - Formulário estático que gera a mensagem pronta e abre o WhatsApp — nenhum dado armazenado no site
  - Identidade visual própria: paleta escura com destaque vermelho e tipografia Bebas Neue + PT Sans
- Resultado: nao informado na base.

### Projetos ocultos (nao exibidos no site)

- Lab de Automação (n8n) (slug: n8n-lab) — Workflows que construí para estudar e aplicar automação. — stack: n8n, Webhooks, APIs REST

## Habilidades

- **Automação & Workflows** [em estudo]: Automatizo tarefas e integro sistemas com n8n, APIs e webhooks, em fluxos simples e confiáveis. Ferramentas: n8n, Webhooks, APIs REST, integrações; usada em: myfly
- **Web & Front-end** [em producao]: Construo interfaces web com HTML, CSS e JavaScript — foi assim que os sistemas do Clube Pirassununga saíram do papel. Ferramentas: HTML5, CSS3, JavaScript; usada em: clubeon, clubstrategy, clubingo, myfly, lume
- **Dados & Backend** [em producao]: Modelo e consulto dados com PostgreSQL e Supabase, incluindo sincronização em tempo real. Ferramentas: PostgreSQL, Supabase, SQL; usada em: clubeon, clubstrategy, clubingo
- **IA aplicada ao desenvolvimento** [em producao]: Uso IA no dia a dia para acelerar o desenvolvimento e a automação, revisando o que vai para produção. Ferramentas: Antigravity, OpenCode, engenharia de prompt; usada em: clubeon, clubstrategy, clubingo, myfly
- **Infraestrutura & Suporte** [em producao]: Instalo, configuro e mantenho equipamentos, redes e estações de trabalho, com atendimento presencial. Ferramentas: Hardware, Redes, Windows, inventário de TI, atendimento em campo
- **Python & Dados** [em estudo]: Estudo Python, com noções de machine learning e análise de dados. Ferramentas: Python, noções de ML e análise de dados
- **Idiomas** [em producao]: Comunico em português (nativo), inglês e francês (C1) e espanhol (B1). Ferramentas: Inglês C1, Francês C1, Espanhol B1, Português nativo
- **Ensino & Comunicação** [em producao]: Ensino Informática e Pacote Office e acompanho alunos de perto, desenvolvendo didática e comunicação. Ferramentas: Pacote Office, didática, monitoria

## Idiomas

- Portugues: nativo
- Ingles: C1
- Frances: C1
- Espanhol: B1
- Alemao: em aprendizado

## Interesses fora do computador

- Idiomas; Ensino; Eletrônica

## Repositorios GitHub (atualizado automaticamente)

- portcarlos (TypeScript) — PORTIFOLIO WEB: https://github.com/C4rlosDaniel/portcarlos
- C4rlosDaniel — Config files for my GitHub profile.: https://github.com/C4rlosDaniel/C4rlosDaniel
- Sistema-de-Transmiss-o-Online- — Sistema profissional de transmissão digital multi-telas desenvolvido para gerenciamento centralizado de anúncios, comunicados e apresentações em tempo real. Compatível com TV Box Android, Smart TVs, navegadores e ambientes corporativos, com sincronização automática de conteúdos e controle remoto de terminais.: https://github.com/C4rlosDaniel/Sistema-de-Transmiss-o-Online-
- python-excel-automation (Python) — Automação de leitura, processamento e geração de planilhas Excel usando Python e OpenPyXL.: https://github.com/C4rlosDaniel/python-excel-automation
- packet-control-suite (Python) — Conjunto de ferramentas para monitoramento, filtragem e análise de tráfego de rede, incluindo firewall simulado, sniffer e sistema de whitelist/blacklist. Totalmente modular.: https://github.com/C4rlosDaniel/packet-control-suite
- slow-print-cli (Python) — A terminal-based Python program that uses a slow typing function (slow_print) to create an interactive experience. The user answers questions and receives motivational and reflective messages, all displayed with an animated typing effect.: https://github.com/C4rlosDaniel/slow-print-cli
- -Interface-de-Login-em-Python-com-Tkinter-e-CustomTkinter (Python) — Interface gráfica simples de login criada em Python usando Tkinter e CustomTkinter, incluindo campos de e-mail, senha, checkbox e botão funcional com tema escuro.: https://github.com/C4rlosDaniel/-Interface-de-Login-em-Python-com-Tkinter-e-CustomTkinter
- Scanner-de-Portas-TCP-com-Multithreading-em-Python (Python) — Ferramenta em Python para varredura rápida de portas TCP usando multithreading e fila (Queue) para processamento concorrente.: https://github.com/C4rlosDaniel/Scanner-de-Portas-TCP-com-Multithreading-em-Python
- Algoritmos-de-Implementa-o-em-JavaScript-Merge-Sort-e-Quick-Sort (HTML) — Este repositório contém uma página interativa em HTML, CSS e JavaScript desenvolvida para demonstrar, de forma visual e detalhada, o funcionamento dos algoritmos Merge Sort e Quick Sort.: https://github.com/C4rlosDaniel/Algoritmos-de-Implementa-o-em-JavaScript-Merge-Sort-e-Quick-Sort
- Keypress-Logger-Demo (Python) — Keypress Logger Demo é um pequeno projeto educacional que mostra como capturar teclas pressionadas no teclado usando Python e a biblioteca pynput. Ele demonstra conceitos de monitoramento de eventos e manipulação de arquivos em um exemplo simples e direto.: https://github.com/C4rlosDaniel/Keypress-Logger-Demo

## Contato

- Formulario no site: https://portcarlos.vercel.app/contato
- E-mail (fallback do formulario): devclub152@gmail.com
- LinkedIn: https://www.linkedin.com/in/carlos-alencar-22b950353
