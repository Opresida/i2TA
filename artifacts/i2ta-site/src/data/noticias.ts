export interface Noticia {
  id: number;
  titulo: string;
  resumo: string;
  corpo?: string;
  categoria: string;
  data: string;
  tempoLeitura: number;
  imagemUrl: string;
  semFoto?: boolean;
  fotosExtras?: { src: string; legenda?: string }[];
}

export const CATEGORIAS = [
  "Todos",
  "Parcerias",
  "Eventos",
  "Credenciamento",
  "Impacto Social",
];

export const noticias: Noticia[] = [
  {
    id: 1,
    titulo:
      "i2TA firma Termo de Cooperação Técnica com a Universidade do Estado do Amazonas",
    resumo:
      "Parceria estratégica entre o instituto e a UEA abre caminho para projetos conjuntos de PD&I, formação de pesquisadores e soluções tecnológicas voltadas à Amazônia.",
    corpo: `O Instituto de Inteligência e Tecnologia Aplicada da Amazônia — i2TA — celebrou a assinatura de Termo de Cooperação Técnica com a Universidade do Estado do Amazonas (UEA), representada por seu reitor, André Zogahib.

O acordo estabelece as bases para o desenvolvimento conjunto de projetos de Pesquisa, Desenvolvimento e Inovação (PD&I), com ênfase em soluções que atendam às demandas específicas da região amazônica — de inteligência artificial aplicada à biodiversidade até sistemas de saúde digital para comunidades ribeirinhas.

A cooperação prevê, ainda, a formação de recursos humanos qualificados: pesquisadores, bolsistas e profissionais de tecnologia terão acesso a programas de capacitação integrados entre o i2TA e os laboratórios da UEA.

"Unir a expertise acadêmica da UEA com a vocação de inovação aplicada do i2TA é criar um corredor de transferência de conhecimento que beneficia diretamente o Amazonas", afirmou Mansur Seffair Neto, Presidente do i2TA.

A iniciativa fortalece a integração entre academia e setor produtivo, posicionando ambas as instituições na vanguarda do desenvolvimento tecnológico regional.`,
    categoria: "Parcerias",
    data: "10 Abr 2026",
    tempoLeitura: 4,
    imagemUrl: "https://i.imgur.com/hniQe3b.png",
  },
  {
    id: 2,
    titulo:
      "i2TA encaminha cooperação com o CETELI/UFAM para desenvolvimento tecnológico de fronteira",
    resumo:
      "A articulação com o CETELI, por meio do professor Kenny Vinente, conectará pesquisa acadêmica de alto nível a aplicações práticas em IA, sistemas embarcados e automação industrial.",
    corpo: `O i2TA está em processo de firmar um termo de cooperação com o Centro de Tecnologia Eletrônica e da Informação (CETELI) da Universidade Federal do Amazonas (UFAM), por meio do professor Dr. Kenny Vinente, coordenador do centro.

O CETELI é referência nacional em pesquisa aplicada a sistemas embarcados, microeletrônica e automação — áreas estratégicas que se alinham diretamente com a agenda de inovação do i2TA.

A parceria prevê o desenvolvimento conjunto de projetos em inteligência artificial, Internet das Coisas (IoT) industrial e automação de processos, com potencial de transferência tecnológica para o polo industrial de Manaus e para setores como saúde, logística e monitoramento ambiental.

"A integração do conhecimento de fronteira do CETELI com a agilidade de execução do i2TA cria um ecossistema de P&D&I diferenciado, capaz de transformar papers em produtos", destacou Leonardo Câmara, Diretor Executivo do i2TA.

Com essa iniciativa, o i2TA avança na ampliação de sua capacidade técnica e na consolidação de sua atuação como Instituição Científica e Tecnológica (ICT) voltada à inovação aplicada no coração da Amazônia.`,
    categoria: "Parcerias",
    data: "02 Abr 2026",
    tempoLeitura: 5,
    imagemUrl:
      "https://i.imgur.com/uYn73dG.jpeg",
  },
  {
    id: 3,
    titulo:
      "i2TA inicia processo de credenciamento junto ao CAPDA para captação de recursos via Lei de Informática",
    resumo:
      "O instituto dá passo estratégico rumo à certificação que habilitará a execução de projetos de PD&I com recursos provenientes dos incentivos fiscais da Zona Franca de Manaus.",
    corpo: `O Instituto de Inteligência e Tecnologia Aplicada da Amazônia — i2TA — deu início ao processo formal de credenciamento junto ao Comitê das Atividades de Pesquisa e Desenvolvimento na Amazônia (CAPDA).

O Credenciamento pelo CAPDA é requisito fundamental para que uma ICT possa atuar como executora de projetos de Pesquisa, Desenvolvimento e Inovação (PD&I) financiados pela Lei de Informática (Lei nº 8.387/1991) — mecanismo de incentivo fiscal que sustenta o ecossistema de inovação da Zona Franca de Manaus.

O processo de credenciamento envolve três frentes simultâneas: a estruturação institucional completa (governança, compliance, infraestrutura laboratorial), a consolidação de uma equipe técnica qualificada com titulação e produção científica compatíveis, e a construção de um portfólio de projetos alinhados às demandas da indústria local e às vocações da Amazônia.

"A certificação CAPDA não é apenas um selo — é a chave que conecta o i2TA ao motor econômico do polo industrial de Manaus. É com ela que transformamos potencial científico em impacto concreto", afirmou Mansur Seffair Neto, Presidente do i2TA.

A conclusão do processo está prevista para o segundo semestre de 2026.`,
    categoria: "Credenciamento",
    data: "25 Mar 2026",
    tempoLeitura: 5,
    imagemUrl:
      "https://i.imgur.com/WWTgGMT.png",
  },
  {
    id: 4,
    titulo:
      "Diretor Executivo do i2TA participa da Brasil Tech 2026 e fortalece posicionamento nacional",
    resumo:
      "Leonardo Câmara representou o instituto no principal encontro de tecnologia e inovação do país, realizado em São Paulo, conectando o i2TA às tendências e lideranças do ecossistema nacional.",
    corpo: `O Diretor Executivo do i2TA, Leonardo Câmara, participou da Brasil Tech 2026, realizada no dia 13 de abril, em São Paulo — um dos principais eventos do calendário nacional de tecnologia e inovação.

A Brasil Tech reuniu lideranças de governo, indústria, startups e centros de pesquisa para debater os caminhos da transformação digital brasileira. Painéis sobre inteligência artificial generativa, infraestrutura de dados soberanos e o papel dos incentivos fiscais na pesquisa foram alguns dos destaques da programação.

"Participar da Brasil Tech é posicionar o i2TA — e a Amazônia — no radar de quem decide os rumos da inovação no país. Não viemos apenas ouvir: trouxemos cases, trouxemos demandas, trouxemos a perspectiva de quem inova a partir da floresta", declarou Leonardo Câmara.

O evento proporcionou um ambiente privilegiado para troca de experiências, identificação de tendências emergentes e fortalecimento de conexões estratégicas com potenciais parceiros, investidores e formuladores de política pública.

A participação reafirma o compromisso do i2TA com a atualização contínua e a integração com o ecossistema tecnológico brasileiro.`,
    categoria: "Eventos",
    data: "14 Abr 2026",
    tempoLeitura: 4,
    imagemUrl:
      "https://i.imgur.com/tJBl7v9.png",
  },
  {
    id: 5,
    titulo:
      "i2TA participa de congresso internacional em El Salvador com foco em segurança e inovação digital",
    resumo:
      "A presença no evento global permitiu ao instituto mapear tendências em inteligência de dados, sistemas digitais e modernização de segurança pública — com aplicações diretas para o Brasil.",
    corpo: `O Diretor Executivo do i2TA, Leonardo Câmara, participou de congresso internacional realizado em El Salvador, voltado à interseção entre segurança pública e inovação tecnológica.

O evento reuniu delegações de mais de 30 países para debater o uso de tecnologias avançadas — inteligência artificial, análise preditiva, reconhecimento de padrões e plataformas integradas de dados — no apoio à tomada de decisão e na modernização de estruturas de segurança pública.

El Salvador, que se tornou referência mundial na aplicação de tecnologia para transformação de políticas de segurança, serviu como case vivo durante o congresso, com visitas técnicas a centros de comando e controle.

"O que vimos em El Salvador é a prova de que tecnologia, quando aplicada com estratégia e ética, pode transformar realidades inteiras. Trouxemos insights concretos sobre como adaptar essas soluções ao contexto brasileiro e amazônico", afirmou Leonardo Câmara.

A participação permitiu ao i2TA acompanhar tendências globais de ponta e identificar oportunidades imediatas de aplicação no contexto nacional, especialmente na integração entre big data, inteligência artificial e sistemas de gestão pública.`,
    categoria: "Eventos",
    data: "08 Abr 2026",
    tempoLeitura: 5,
    imagemUrl: "https://i.imgur.com/Q45glqx.png",
    fotosExtras: [
      { src: "https://i.imgur.com/2lWLrbQ.jpeg", legenda: "Diretor Executivo do i2TA durante o congresso internacional em El Salvador" },
    ],
  },
  {
    id: 6,
    titulo:
      "i2TA firma parceria com o CVI Amazonas e leva tecnologia para a reabilitação de pessoas com deficiência",
    resumo:
      "A cooperação com o Centro de Vida Independente do Amazonas une inovação tecnológica e impacto social direto — ampliando o acesso a serviços de saúde e inclusão para quem mais precisa.",
    corpo: `O i2TA formalizou parceria estratégica com o CVI Amazonas — Centro de Vida Independente do Amazonas —, instituição reconhecida pelo Ministério da Saúde como Centro Especializado em Reabilitação (CER III) e referência estadual em reabilitação biopsicossocial.

O CVI atende mais de 50 municípios com atendimento 100% gratuito pelo SUS, oferecendo fisioterapia, terapia ocupacional, fonoaudiologia, psicologia, serviço social e neurologia — impactando diretamente a vida de milhares de pessoas com deficiência, seus familiares e cuidadores.

A cooperação entre as duas instituições tem como objetivo o desenvolvimento de soluções tecnológicas aplicadas à saúde: desde plataformas de gestão de atendimentos até ferramentas de telemedicina para comunidades ribeirinhas, passando por sistemas de monitoramento remoto de pacientes e automação de processos assistenciais.

"O CVI representa o que há de mais humano no serviço público brasileiro. Levar tecnologia para dentro dessa operação é multiplicar cada sessão de fisioterapia, cada atendimento psicológico, cada momento de acolhimento", afirmou Mansur Seffair Neto, Presidente do i2TA.

A iniciativa reforça o posicionamento do i2TA como uma ICT que não mede impacto apenas por papers publicados ou patentes registradas — mas por vidas transformadas.`,
    categoria: "Impacto Social",
    data: "01 Abr 2026",
    tempoLeitura: 5,
    imagemUrl:
      "https://i.imgur.com/3fASqIu.png",
  },
];
