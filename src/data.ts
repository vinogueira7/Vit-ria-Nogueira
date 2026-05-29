import { Product, Testimonial, Service } from './types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-1',
    name: 'Ração Premium Natural Cães Adultos',
    description: 'Fórmula enriquecida com ômega 3 e 6, condroitina e glicosamina para articulações saudáveis de cães de médio e grande porte. Sem corantes artificiais.',
    price: 189.90,
    originalPrice: 229.00,
    category: 'alimentos',
    petType: 'dogs',
    image: 'https://images.unsplash.com/photo-1589714309255-ecfd0c2d5a7a?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 142,
    isAvailable: true,
    badge: 'Mais Vendido',
    specs: {
      weight: '10.1 kg',
      brand: 'NutriAura Premium',
      origin: 'Nacional'
    }
  },
  {
    id: 'prod-2',
    name: 'Fonte de Água Inteligente Bivolt',
    description: 'Fontanário automático com filtragem tripla de carvão ativo e fluxo contínuo. Estimula gatos e cães pequenos a beberem mais água, prevenindo problemas renais.',
    price: 159.90,
    originalPrice: 199.90,
    category: 'acessorios',
    petType: 'cats',
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 96,
    isAvailable: true,
    badge: 'Destaque',
    specs: {
      weight: '1.2 kg',
      brand: 'AquaFlow Pets',
      origin: 'Importado'
    }
  },
  {
    id: 'prod-3',
    name: 'Brinquedo Mordedor Osso Nylon indestrutível',
    description: 'Mordedor texturizado super resistente feito para cães mordedores fortes. Limpa os dentes, massageia a gengiva e combate a ansiedade e tédio.',
    price: 45.00,
    category: 'brinquedos',
    petType: 'dogs',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviewsCount: 118,
    isAvailable: true,
    badge: 'Super Resistente',
    specs: {
      weight: '250g',
      brand: 'ChewChampion',
      origin: 'Nacional'
    }
  },
  {
    id: 'prod-4',
    name: 'Arranhador Torre Castelo de Pelúcia',
    description: 'Arranhador multinível com caverna aconchegante, redes suspensas, brinquedos pendentes e postes revestidos de corda de sisal natural para gatas e gatos.',
    price: 299.90,
    originalPrice: 349.90,
    category: 'brinquedos',
    petType: 'cats',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
    rating: 5.0,
    reviewsCount: 64,
    isAvailable: true,
    badge: 'Frete Grátis',
    specs: {
      weight: '4.5 kg',
      brand: 'CatPalace',
      origin: 'Nacional'
    }
  },
  {
    id: 'prod-5',
    name: 'Coleira Peitoral Ergonômica Antipuxão',
    description: 'Distribui a pressão de tração pelo peito do pet de forma uniforme, evitando asfixia ou desconforto. Conta com tiras refletivas para passeios noturnos seguros.',
    price: 89.90,
    originalPrice: 110.00,
    category: 'acessorios',
    petType: 'dogs',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviewsCount: 82,
    isAvailable: true,
    specs: {
      weight: '300g',
      brand: 'SafeWalk',
      origin: 'Importado'
    }
  },
  {
    id: 'prod-6',
    name: 'Suplemento Multivitamínico Pet Sênior',
    description: 'Complexo de vitaminas, minerais e antioxidantes desenvolvido especialmente para as necessidades de cães e gatos com mais de 7 anos. Melhora vitalidade e pelagem.',
    price: 69.90,
    category: 'saude',
    petType: 'others',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 51,
    isAvailable: true,
    badge: 'Recomendação Vet',
    specs: {
      weight: '120g (60 tabs)',
      brand: 'VetVigor',
      origin: 'Nacional'
    }
  },
  {
    id: 'prod-7',
    name: 'Ração Especial para Calopsita e Pássaros',
    description: 'Mistura selecionada de sementes nobres, painço, aveia e extrusados ricos em vitaminas essenciais para plumagem brilhante e alto nível de energia.',
    price: 34.90,
    category: 'alimentos',
    petType: 'others',
    image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 43,
    isAvailable: true,
    specs: {
      weight: '1.0 kg',
      brand: 'NutriBird',
      origin: 'Nacional'
    }
  },
  {
    id: 'prod-8',
    name: 'Tapete Higiênico de Alto Carbono (30 un)',
    description: 'Superabsorção tecnológica com carvão ativado que neutraliza instantaneamente o odor e disfarça as manchas de xixi. Atrativo canino para treino rápido.',
    price: 79.90,
    originalPrice: 89.90,
    category: 'saude',
    petType: 'dogs',
    image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 220,
    isAvailable: true,
    badge: 'Novidade',
    specs: {
      weight: '1.8 kg',
      brand: 'DryPad Carbon',
      origin: 'Nacional'
    }
  },
  {
    id: 'prod-9',
    name: 'Kit de Brinquedos Interativos para Gatos',
    description: 'Contém túnel dobrável, varas com penas, ratinhos com som de chocalho e bolinhas de sisal enriquecidas com Erva de Gato (catnip) orgânica desidratada.',
    price: 54.90,
    category: 'brinquedos',
    petType: 'cats',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviewsCount: 39,
    isAvailable: true,
    specs: {
      weight: '350g',
      brand: 'CatPalace',
      origin: 'Importado'
    }
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    ownerName: 'Mariana Silva',
    petName: 'Mel',
    petBreed: 'Golden Retriever',
    petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200',
    comment: 'A ração natural da PetAura mudou a disposição da Mel! O pelo dela ficou incrivelmente brilhoso e macio, e ela adora o sabor. Os brinquedos mordedores também são os únicos que ela não destrói em um dia. Atendimento impecável!',
    rating: 5,
    date: '2 semanas atrás'
  },
  {
    id: 't-2',
    ownerName: 'Ricardo Oliveira',
    petName: 'Sushi',
    petBreed: 'Gato Siamês',
    petImage: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=200',
    comment: 'A fonte de água inteligente é sensacional. O Sushi vivia querendo beber água da pia aberta, agora ele só fica na fonte dele. O sistema de filtragem funciona super bem e é extremamente silencioso. Entrega super rápida para São Paulo.',
    rating: 5,
    date: '1 mês atrás'
  },
  {
    id: 't-3',
    ownerName: 'Clarice Mendes',
    petName: 'Floquinho',
    petBreed: 'Maltês',
    petImage: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=200',
    comment: 'Os tapetes de carbono ativado são fantásticos! Não fica cheiro nenhum no apartamento e absorve incrivelmente rápido sem vazar. PetAura é simplesmente minha loja parceira favorita para cuidar do Floquinho com todo carinho!',
    rating: 5,
    date: '3 dias atrás'
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: 'srv-1',
    title: 'Spa & Banho Relaxante',
    description: 'Um banho luxuoso que utiliza cosméticos hipoalergênicos e ozonoterapia para purificar a pele e pelagem, enquanto uma massagem relaxante acalma o pet.',
    price: 89.90,
    duration: '1h 30m',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600',
    benefits: [
      'Água aquecida com controle exato',
      'Secagem ultra-silenciosa antiqueda',
      'Corte de unhas e limpeza de ouvidos',
      'Perfume exclusivo natural de lavanda'
    ]
  },
  {
    id: 'srv-2',
    title: 'Tosa Personalizada da Raça',
    description: 'Corte de pelos estruturado por especialistas em estética canina e felina, respeitando o padrão oficial da raça ou com propostas modernas (Tosa Bebê, Ursinho).',
    price: 119.90,
    duration: '2h',
    image: 'https://images.unsplash.com/photo-1527526029430-319f10814151?auto=format&fit=crop&q=80&w=600',
    benefits: [
      'Profissionais certificados internacionalmente',
      'Uso de equipamentos esterilizados',
      'Hidratação profunda pós-tosa incluída',
      'Consultoria estética pré-corte'
    ]
  },
  {
    id: 'srv-3',
    title: 'Consulta Nutricional / Nutropet',
    description: 'Orientação profissional direcionada para montar uma dieta caseira balanceada ou indicação personalizada de rações cruas e suplementação para pets alérgicos ou idosos.',
    price: 149.90,
    duration: '1h',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600',
    benefits: [
      'Montagem de cardápio focado em longevidade',
      'Avaliação de bioimpedância corporal completa',
      'Acompanhamento mensal por WhatsApp',
      'Estudo de restrições alimentares específicas'
    ]
  }
];
