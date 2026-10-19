"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import { readLastOrder } from "@/lib/payment";
import type { DemoOrder } from "@/types/product";
import { Button } from "@/components/ui/button";

type Status = "loading" | "order" | "empty";

export function OrderConfirmation() {
  const [status, setStatus] = useState<Status>("loading");
  const [order, setOrder] = useState<DemoOrder | null>(null);

  useEffect(() => {
    const stored = readLastOrder();
    if (stored) {
      setOrder(stored);
      setStatus("order");
    } else {
      setStatus("empty");
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center gap-3 rounded-[1.75rem] border border-chocolate/10 bg-white/60 px-6 py-24 text-chocolate/60">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        Chargement de votre commande…
      </div>
    );
  }

  if (status === "empty" || !order) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-[1.75rem] border border-dashed border-chocolate/25 px-6 py-24 text-center">
        <h2 className="font-display text-3xl uppercase">Aucune commande trouvée</h2>
        <p className="max-w-md text-sm leading-relaxed text-chocolate/60">
          Cette page affiche la dernière commande de démonstration passée sur cet appareil.
          Passez une commande pour la voir apparaître ici.
        </p>
        <Button href="/shop" size="lg">
          Découvrir la boutique
        </Button>
      </div>
    );
  }

  const createdAt = new Date(order.createdAt);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
      <div className="rounded-[1.75rem] bg-chocolate p-8 text-cream sm:p-10">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bakery-yellow text-chocolate">
            <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-bakery-yellow">
              Commande de démonstration
            </p>
            <h2 className="font-display text-3xl uppercase leading-none">Merci !</h2>
          </div>
        </div>

        <p className="mt-6 text-base leading-relaxed text-cream/75">
          Votre commande simulée a bien été enregistrée sur cet appareil.{" "}
          <strong className="text-cream">
            Aucun paiement n'a été effectué et aucune donnée n'a été transmise.
          </strong>
        </p>

        <dl className="mt-8 grid gap-4 border-t border-cream/15 pt-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-cream/60">Référence</dt>
            <dd className="mt-1 font-display text-lg tracking-wide">{order.reference}</dd>
          </div>
          <div>
            <dt className="text-cream/60">Date</dt>
            <dd className="mt-1 font-semibold">
              {createdAt.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              ·{" "}
              {createdAt.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </dd>
          </div>
          <div>
            <dt className="text-cream/60">Client</dt>
            <dd className="mt-1 font-semibold">
              {order.customer.firstName} {order.customer.lastName}
            </dd>
          </div>
          <div>
            <dt className="text-cream/60">
              {order.fulfillment === "pickup" ? "Retrait en boutique" : "Livraison"}
            </dt>
            <dd className="mt-1 font-semibold">
              {order.fulfillment === "pickup"
                ? "12, rue des Fournils, Marrakech"
                : `${order.customer.address ?? ""}${order.customer.city ? `, ${order.customer.city}` : ""}`}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/shop" variant="yellow">
            Continuer mes achats
          </Button>
          <Link
            href="/contact"
            className="inline-flex items-center font-display text-sm uppercase tracking-wide underline decoration-bakery-yellow decoration-2 underline-offset-8 text-cream transition-colors hover:text-bakery-yellow"
          >
            Une question ? Contactez-nous
          </Link>
        </div>
      </div>

      <aside
        aria-label="Détail de la commande"
        className="h-fit rounded-[1.75rem] border border-chocolate/10 bg-white/60 p-6 sm:p-8"
      >
        <h2 className="font-display text-2xl uppercase">Détail</h2>
        <ul className="mt-6 flex flex-col gap-4 border-b border-chocolate/10 pb-6 text-sm">
          {order.items.map((item, index) => (
            <li key={`${item.name}-${index}`} className="flex justify-between gap-4">
              <span className="text-chocolate/75">
                {item.quantity} × {item.name}
                {item.variantLabel ? ` (${item.variantLabel})` : ""}
              </span>
              <span className="shrink-0 font-semibold">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-6 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-chocolate/60">Sous-total</dt>
            <dd className="font-semibold">{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-chocolate/60">Livraison</dt>
            <dd className="font-semibold">
              {order.shippingFee === 0 ? "Offerte" : formatPrice(order.shippingFee)}
            </dd>
          </div>
          <div className="mt-2 flex justify-between border-t border-chocolate/10 pt-4 text-base">
            <dt className="font-display uppercase">Total simulé</dt>
            <dd className="font-display">{formatPrice(order.total)}</dd>
          </div>
        </dl>
        {order.customer.note ? (
          <p className="mt-6 rounded-2xl bg-cream-deep px-4 py-3 text-sm text-chocolate/75">
            <span className="font-semibold">Note : </span>
            {order.customer.note}
          </p>
        ) : null}
      </aside>
    </div>
  );
}
