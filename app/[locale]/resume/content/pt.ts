
import { ResumeContent } from "./types";

export const resumePt: ResumeContent = {
    jobTitle: 'Desenvolvedor de Software Full Stack',
    intro: 'Graduado em Análise e Desenvolvimento de Sistemas, com experiência prática em desenvolvimento full-stack, especializado em React, Next.js, Node.js e Python. Possuo conhecimentos em integração de sistemas, liderança de equipes e desenvolvimento de soluções web centradas no usuário. Utilizo minha sólida experiência na área de vendas para trazer uma perspectiva diferenciada na resolução de problemas e na colaboração com diferentes partes interessadas. Busco contribuir para projetos inovadores de tecnologia, gerando resultados por meio de uma postura proativa e do compromisso com a excelência.',
    achievementLabel: 'Destaques:',
    sections: {
        experience: 'Experiência Profissional',
        academic: 'Atividades Acadêmicas',
        education: 'Educação',
        skills: 'Habilidades Técnicas',
        languages: 'Idiomas',
        softSkills: 'Habilidades Sociais',
    },
    education: [{
        degree: 'Análise e Desenvolvimento de Sistemas',
        institution: 'IESB, Brasília – DF',
        detail: 'Graduação • Formado em Julho de 2026',
    }],
    experiences: [

        {
            position: 'Analista de Suporte a Clientes de RI',
            company: 'Q4 Inc.',
            period: 'Setembro de 2025 – Presente',
            description: [
                'Atualização de sites de relações com investidores de clientes usando uma solução de CMS proprietária, mantendo 96,8% de conformidade com o SLA.',
                'Uso de HTML, CSS, jQuery e outras ferramentas para entregar atualizações pontuais nos sites dos clientes, mantendo bons indicadores de desempenho.',
                'Coordenação com colegas para garantir um atendimento fluido durante o período de divulgação de resultados, assegurando que atualizações e comunicados sensíveis ao tempo sejam publicados no prazo.',
                'Diagnóstico e resolução de problemas nos sites.',
            ],
            achievements: [
                'Mantive métricas consistentemente acima da média em todas as áreas de desempenho avaliadas. Recebi diversos feedbacks positivos de clientes, tanto por telefone quanto pelo canal de pesquisa de satisfação.',
            ],
        },
        {
            position: 'Analista de Implementação de Sistemas I',
            company: 'Outsmart',
            period: 'Abril de 2025 – Setembro de 2025',
            description: [
                'Projetei e desenvolvi interfaces front-end modulares usando React, TypeScript, Next.js, Vue.js e Angular.',
                'Reformulei layouts e implementei estilos CSS para melhorar as interfaces das aplicações.',
                'Integrei aplicações ao ambiente Zoho CRM usando Deluge.',
                'Realizei manutenções e melhorias em aplicações front-end e back-end.',
                'Desenvolvi soluções de software personalizadas conforme os requisitos dos clientes.',
                'Implementei soluções tecnológicas desde o levantamento de requisitos até a entrega final.',
            ],
            achievements: [
                'Contribuí para o desenvolvimento de diversas soluções e integrações para empresas clientes, incluindo funcionalidades complexas adaptadas especificamente aos requisitos de cada negócio.',
            ],
        },
        {
            position: 'Estagiário de Desenvolvimento Web',
            company: 'Outsmart',
            period: 'Setembro de 2024 – Abril de 2025',
            description: [
                'Desenvolvi interfaces front-end usando React, TypeScript, Next.js, Vue.js e Angular.',
                'Reformulei layouts de aplicações e implementei estilos CSS.',
                'Integrei aplicações ao ambiente Zoho CRM usando Deluge.',
                'Realizei manutenção em aplicações escritas em JavaScript, Vue.js e Next.js.',
                'Desenvolvi soluções de software personalizadas para empresas clientes.',
            ],
            achievements: [
                'Implementei soluções com sucesso dentro de prazos curtos.',
                'Tornei-me familiarizado com uma nova linguagem e um novo framework em menos de três meses (Deluge e Vue.js).',
                'Fui efetivado após concluir os seis meses de estágio.',
            ],
        },
    ],
    academicActivities: [
        {
        position: 'Líder Front-end – Bay Area Project',
        company: 'IESB, Brasília – DF',
        period: 'Março de 2024 – Agosto de 2024',
        description: [
            'Desenvolvi interfaces usando React e TypeScript com Next.js.',
            'Refatorei layouts, criei rotas autenticadas e integrei aplicações com sistemas back-end.',
            'Coordenei atividades de desenvolvimento front-end e gerenciei sprints.',
        ],
        achievements:[
            'Contribuí na coordenação do time de desenvolvimento front-end e implementei soluções para melhorar a organização e a escalabilidade do código.',
        ],
    },
    {
        position: 'Monitor Acadêmico – Design de Interfaces',
        company: 'IESB, Brasília – DF',
        period: 'Março de 2024 – Julho de 2024',
        description: [
            'Contribuí com o desenvolvimento dos meus colegas de turma nos temas discutidos durante a disciplina.',
            'Orientei os alunos nas dificuldades encontradas nos exercícios das aulas.',
            'Trabalhei junto ao professor no desenvolvimento de novos exercícios para fixar melhor o entendimento da turma sobre práticas fundamentais de design, como variáveis CSS, páginas responsivas com media queries, design mobile-first, acessibilidade básica, feedback de interface e design de UI/UX.',
        ],
        achievements:[
            'Contribuí significativamente para o avanço da turma, segundo o professor da disciplina. Desenvolvi uma masterclass de 1h30 em live coding sobre design de interfaces e boas práticas, demonstrando a aplicação real dos conceitos abordados em aula.',
        ],
    },
    {
        position: 'Monitor Acadêmico – Lógica de Programação',
        company: 'IESB, Brasília – DF',
        period: 'Março de 2024 – Julho de 2024',
        description: [
            'Contribuí com o desenvolvimento dos meus colegas de turma nos temas discutidos durante a disciplina.',
            'Orientei os alunos nas dificuldades encontradas nos exercícios das aulas.',
            'Trabalhei junto ao professor no desenvolvimento de novos exercícios para fixar melhor o entendimento da turma sobre tópicos como tipos de dados, variáveis, arrays, objetos, laços de repetição, funções, funções assíncronas, APIs, fetch e blocos try-catch.',
        ],
        achievements:   [
            'Contribuí significativamente para o avanço da turma, segundo o professor da disciplina. Desenvolvi uma masterclass de 1h30 em live coding sobre lógica de programação, expandindo o projeto de design de interfaces e adicionando funcionalidades com JavaScript puro.',
        ],
    },
    ],
    skillGroups: [
        {
        title: 'Linguagens',
        skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'SQL', 'Python'],
    },
    {
        title: 'Frameworks',
        skills: ['React', 'Next.js', 'Express', 'Vue'],
    },
    {
        title: 'Bibliotecas',
        skills: [
            'Tailwind',
            'Sass',
            'Mongoose',
            'Prisma',
            'Axios',
            'Zod',
            'Yup',
            'Pandas',
            'Scikit-learn',
            'NumPy',
            'Matplotlib',
        ],
    },
    {
        title: 'Bancos de Dados',
        skills: ['MongoDB', 'MySQL', 'SQLite'],
    },
    {
        title: 'Ferramentas',
        skills: ['Git', 'GitHub', 'Node.js', 'Docker', 'Power BI'],
    },
    {
        title: 'Outros',
        skills: [
            'Desenvolvimento Ágil',
            'Gestão de Projetos',
            'Slack',
            'Basecamp',
            'Bitrix',
            'Gather',
        ],
    },
    ],
    languages: [
    { language: 'Português', level: 'Nativo' },
    { language: 'Inglês', level: 'Fluente' },
    { language: 'Espanhol', level: 'Intermediário' },
    { language: 'Francês', level: 'Básico' },
],
    softSkills: [
    'Boa comunicação',
    'Capacidade de trabalhar com prazos curtos',
    'Automotivado',
    'Autogerenciável',
    'Aprendizado contínuo',
    'Grande atenção aos detalhes',
],
};

