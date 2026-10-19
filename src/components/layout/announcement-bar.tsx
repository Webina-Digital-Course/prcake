import { Croissant, Gift, Truck, Wheat } from "lucide-react";

const messages = [
  { icon: Truck, text: "Livraison offerte dès 150 DH" },
  { icon: Gift, text: "−15 % dès 100 DH d'achat" },
  { icon: Wheat, text: "Cuisson du jour, chaque matin" },
  { icon: Croissant, text: "Abonnez-vous à la newsletter : −15 %" },
];

function MessageList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-12 pr-12"
      aria-hidden={hidden ? "true" : undefined}
    >
      {messages.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-center gap-2 whitespace-nowrap">
          <Icon className="h-3.5 w-3.5 text-bakery-yellow" aria-hidden="true" />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream sm:text-xs">
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function AnnouncementBar() {
  return (
    <div className="bg-promo text-cream">
      <div className="marquee-mask overflow-hidden py-2.5">
        <div className="animate-marquee flex w-max">
          <MessageList />
          <MessageList hidden />
        </div>
      </div>
    </div>
  );
}
