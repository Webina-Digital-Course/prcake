export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavLink[];
}

export const navigation: NavItem[] = [
  { label: "Gâteaux", href: "/category/cakes" },
  {
    label: "Boulangerie",
    children: [
      { label: "Tous les pains", href: "/category/bread" },
      { label: "Bagels", href: "/category/bagels" },
      { label: "Viennoiseries", href: "/category/pastries" },
      { label: "Toute la boutique", href: "/shop" },
    ],
  },
  { label: "Notre histoire", href: "/about" },
  {
    label: "Biscuits",
    children: [
      { label: "Tous les biscuits", href: "/category/cookies" },
      { label: "Cookie pépites", href: "/shop/cookie-pepites-chocolat" },
      { label: "Macarons assortis", href: "/shop/macarons-assortis" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
