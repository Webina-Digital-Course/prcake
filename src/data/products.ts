import type { CategoryMeta, Product, ProductCategory } from "@/types/product";

export const categories: CategoryMeta[] = [
  {
    slug: "cakes",
    label: "Gâteaux",
    tagline: "Généreux, gourmands, à partager",
    image: "/images/category-cakes-placeholder.svg",
  },
  {
    slug: "bread",
    label: "Pains",
    tagline: "Levain, farine, patience",
    image: "/images/category-bread-placeholder.svg",
  },
  {
    slug: "cookies",
    label: "Biscuits",
    tagline: "Croustillants, fondants, irrésistibles",
    image: "/images/category-cookies-placeholder.svg",
  },
  {
    slug: "bagels",
    label: "Bagels",
    tagline: "Dorés, moelleux, généreux",
    image: "/images/category-bagels-placeholder.svg",
  },
  {
    slug: "pastries",
    label: "Viennoiseries",
    tagline: "Feuilletées, beurrées, du matin",
    image: "/images/category-pastries-placeholder.svg",
  },
];

export const products: Product[] = [
  {
    id: "p-001",
    slug: "croissant-au-beurre",
    name: "Croissant au beurre",
    category: "pastries",
    price: 12,
    shortDescription: "Feuilletage pur beurre, croustillant à souhait.",
    description:
      "Nos croissants sont façonnés à la main chaque matin avec un beurre de tourage AOP. Quarante-huit heures de repos pour un feuilletage aérien, doré et craquant à chaque bouchée.",
    dietaryLabels: ["Fait maison", "Végétarien"],
    image: "/images/product-croissant-placeholder.svg",
    gallery: [
      "/images/product-croissant-placeholder.svg",
      "/images/featured-bread-placeholder.svg",
    ],
    variants: [
      { id: "pc-1", label: "À la pièce", priceDelta: 0 },
      { id: "pc-4", label: "Boîte de 4", priceDelta: 30 },
      { id: "pc-8", label: "Boîte de 8", priceDelta: 66 },
    ],
    featured: true,
    bestSeller: true,
    releasedAt: "2026-01-12",
  },
  {
    id: "p-002",
    slug: "pain-au-chocolat",
    name: "Pain au chocolat",
    category: "pastries",
    price: 14,
    shortDescription: "Deux barres de chocolat noir dans un feuilletage doré.",
    description:
      "Le classique indémodable : un feuilletage pur beurre qui croustille, deux bâtons de chocolat noir 65 % et une pointe de fleur de sel. Cuit à la commande toute la matinée.",
    dietaryLabels: ["Fait maison", "Chocolat noir"],
    image: "/images/product-pain-chocolat-placeholder.svg",
    gallery: ["/images/product-pain-chocolat-placeholder.svg"],
    bestSeller: true,
    releasedAt: "2026-01-10",
  },
  {
    id: "p-003",
    slug: "cookie-pepites-chocolat",
    name: "Cookie pépites de chocolat",
    category: "cookies",
    price: 18,
    shortDescription: "Cœur fondant, bords croustillants, pépites généreuses.",
    description:
      "Notre cookie signature : pâte reposée 36 heures, pépites de chocolat noir et noisettes torréfiées. Un classique culte, généreux et délicatement croustillant sur les bords.",
    dietaryLabels: ["Fait maison", "Noisettes"],
    image: "/images/product-cookies-placeholder.svg",
    gallery: ["/images/product-cookies-placeholder.svg"],
    variants: [
      { id: "ck-c", label: "Classique", priceDelta: 0 },
      { id: "ck-d", label: "Double chocolat", priceDelta: 4 },
      { id: "ck-g", label: "Sans gluten", priceDelta: 6 },
    ],
    featured: true,
    bestSeller: true,
    releasedAt: "2026-02-02",
  },
  {
    id: "p-004",
    slug: "cookie-speculoos",
    name: "Cookie speculoos",
    category: "cookies",
    price: 16,
    shortDescription: "Épices douces, cassonade et cœur moelleux.",
    description:
      "Cannelle, gingembre, muscade : notre cookie speculoos goûte l'hiver toute l'année. Moelleux au centre, croustillant sur les bords, une touche de cassonade en surface.",
    dietaryLabels: ["Fait maison", "Épices"],
    image: "/images/product-cookie-speculoos-placeholder.svg",
    gallery: ["/images/product-cookie-speculoos-placeholder.svg"],
    releasedAt: "2026-02-18",
  },
  {
    id: "p-005",
    slug: "cheesecake-fruits-rouges",
    name: "Cheesecake fruits rouges",
    category: "cakes",
    price: 120,
    shortDescription: "Crémeux, acidulé, couronné de fruits rouges.",
    description:
      "Un biscuit sablé, une crème au fromage blanc légèrement acidulée et un voile de fruits rouges maison. Notre cheesecake est la pièce maîtresse de toutes les tables de fête.",
    dietaryLabels: ["Fait maison", "À partager"],
    image: "/images/product-cake-placeholder.svg",
    gallery: ["/images/product-cake-placeholder.svg"],
    variants: [
      { id: "ch-6", label: "6 parts", priceDelta: 0 },
      { id: "ch-12", label: "12 parts", priceDelta: 80 },
    ],
    featured: true,
    bestSeller: true,
    releasedAt: "2026-01-25",
  },
  {
    id: "p-006",
    slug: "carottes-et-noix",
    name: "Gâteau carottes & noix",
    category: "cakes",
    price: 95,
    shortDescription: "Moelleux, épicé, glacé crème.",
    description:
      "Carottes râpées, noix du Maroc, cannelle et un glaçage crème onctueux. Un gâteau généreux et réconfortant, préparé chaque semaine selon la recette de la maison.",
    dietaryLabels: ["Fait maison", "Noix"],
    image: "/images/product-carrot-cake-placeholder.svg",
    gallery: ["/images/product-carrot-cake-placeholder.svg"],
    bestSeller: true,
    releasedAt: "2026-01-08",
  },
  {
    id: "p-007",
    slug: "tarte-citron-meringuee",
    name: "Tarte citron meringuée",
    category: "cakes",
    price: 110,
    shortDescription: "Crème citron vive, meringue légèrement brûlée.",
    description:
      "Un sablé croquant, une crème de citron jaune ultra parfumée et une meringue italienne soufflée au chalumeau. L'équilibre parfait entre acidité et douceur.",
    dietaryLabels: ["Fait maison", "Œufs fermiers"],
    image: "/images/product-tart-placeholder.svg",
    gallery: ["/images/product-tart-placeholder.svg"],
    releasedAt: "2026-03-01",
  },
  {
    id: "p-008",
    slug: "bagel-sesame",
    name: "Bagel sésame",
    category: "bagels",
    price: 15,
    shortDescription: "Boucle dorée, semée de sésame, mie moelleuse.",
    description:
      "Nos bagels sont bouclés à la main, brièvement bouillis dans un sirop de miel puis cuits à la vapeur et au four. Couverts de graines de sésame dorées.",
    dietaryLabels: ["Fait maison", "Miel"],
    image: "/images/product-bagel-placeholder.svg",
    gallery: ["/images/product-bagel-placeholder.svg"],
    variants: [
      { id: "bg-n", label: "Nature", priceDelta: 0 },
      { id: "bg-s", label: "Sésame", priceDelta: 2 },
      { id: "bg-e", label: "Everything", priceDelta: 3 },
    ],
    bestSeller: true,
    releasedAt: "2026-02-08",
  },
  {
    id: "p-009",
    slug: "bagel-tout-grain",
    name: "Bagel tout grain",
    category: "bagels",
    price: 17,
    shortDescription: "Cinq graines, farine complète, longue fermentation.",
    description:
      "Farine complète, graines de lin, tournesol, sésame et pavot. Une fermentation lente de douze heures pour une mie dense et parfumée, idéale avec du fromage frais.",
    dietaryLabels: ["Complet", "Longue fermentation"],
    image: "/images/product-bagel-seeded-placeholder.svg",
    gallery: ["/images/product-bagel-seeded-placeholder.svg"],
    releasedAt: "2026-02-22",
  },
  {
    id: "p-010",
    slug: "baguette-tradition",
    name: "Baguette tradition",
    category: "bread",
    price: 10,
    shortDescription: "Croustillante, alvéolée, sans additif.",
    description:
      "Farine de meule, eau, sel, levure : quatre ingrédients, rien d'autre. Fermentation lente de dix-huit heures pour une baguette à la croûte chantante et à la mie irrégulière.",
    dietaryLabels: ["Sans additif", "Levain"],
    image: "/images/product-baguette-placeholder.svg",
    gallery: ["/images/product-baguette-placeholder.svg"],
    bestSeller: true,
    releasedAt: "2026-01-05",
  },
  {
    id: "p-011",
    slug: "pain-campagne-levain",
    name: "Pain de campagne au levain",
    category: "bread",
    price: 28,
    shortDescription: "Grand pain rond, croûte épaisse, mie acidulée.",
    description:
      "Notre pain de campagne est nourri à un levain vivant entretenu depuis l'ouverture de la boutique. Une croûte épaisse et fumée, une mie légèrement acidulée qui se bonifie pendant des jours.",
    dietaryLabels: ["Levain vivant", "Sans levure"],
    image: "/images/product-country-loaf-placeholder.svg",
    gallery: ["/images/product-country-loaf-placeholder.svg"],
    variants: [
      { id: "pl-5", label: "500 g", priceDelta: 0 },
      { id: "pl-10", label: "1 kg", priceDelta: 12 },
    ],
    featured: true,
    releasedAt: "2026-01-03",
  },
  {
    id: "p-012",
    slug: "brioche-feuilletee",
    name: "Brioche feuilletée",
    category: "bread",
    price: 32,
    shortDescription: "Dorée, filante, beurrée à la demande.",
    description:
      "La brioche feuilletée de la maison : des plis de pâte beurrée empilés à la main, une pointe de fleur de sel et un dorage au jaune d'œuf. À déchirer encore tiède.",
    dietaryLabels: ["Fait maison", "Beurre"],
    image: "/images/product-brioche-placeholder.svg",
    gallery: ["/images/product-brioche-placeholder.svg"],
    releasedAt: "2026-03-05",
  },
  {
    id: "p-013",
    slug: "cinnamon-roll",
    name: "Cinnamon roll",
    category: "pastries",
    price: 22,
    shortDescription: "Spirale de cannelle, glaçage crème.",
    description:
      "Une spirale moelleuse de pâte briochée roulée avec cannelle et cassonade, nappée d'un glaçage crème-fraîche à peine sucré. À savourer au réveil.",
    dietaryLabels: ["Fait maison", "Cannelle"],
    image: "/images/product-cinnamon-roll-placeholder.svg",
    gallery: ["/images/product-cinnamon-roll-placeholder.svg"],
    badge: "Nouveau",
    bestSeller: true,
    releasedAt: "2026-03-12",
  },
  {
    id: "p-014",
    slug: "brownie-fondant",
    name: "Brownie fondant",
    category: "cookies",
    price: 25,
    shortDescription: "Cœur coulant, croûte fine, éclats de noix.",
    description:
      "Chocolat noir 70 %, beurre noisette et farine en petite quantité pour un brownie ultra fondant. Une croûte fine craquelle et des éclats de noix en surface.",
    dietaryLabels: ["Chocolat noir", "Noix"],
    image: "/images/product-brownie-placeholder.svg",
    gallery: ["/images/product-brownie-placeholder.svg"],
    variants: [
      { id: "br-2", label: "Part de 2", priceDelta: 0 },
      { id: "br-6", label: "Boîte de 6", priceDelta: 60 },
    ],
    releasedAt: "2026-02-14",
  },
  {
    id: "p-015",
    slug: "macarons-assortis",
    name: "Macarons assortis",
    category: "cookies",
    price: 45,
    shortDescription: "Coques lisses, cœur parfumé, six saveurs.",
    description:
      "Coques craquantes, cœurs fondants : six parfums de saison travaillés chaque semaine — vanille, pistache, citron, rose-litchi, chocolat et café.",
    dietaryLabels: ["Sans gluten", "Fait maison"],
    image: "/images/product-macarons-placeholder.svg",
    gallery: ["/images/product-macarons-placeholder.svg"],
    variants: [
      { id: "ma-6", label: "Boîte de 6", priceDelta: 0 },
      { id: "ma-12", label: "Boîte de 12", priceDelta: 40 },
    ],
    badge: "Nouveau",
    releasedAt: "2026-03-15",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getBestSellers(): Product[] {
  return products.filter((product) => product.bestSeller);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (candidate) => candidate.id !== product.id && candidate.category === product.category,
  );
  const others = products.filter(
    (candidate) => candidate.id !== product.id && candidate.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function isValidCategory(value: string): value is ProductCategory {
  return (["cakes", "bread", "cookies", "bagels", "pastries"] as string[]).includes(value);
}
