"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { computeShippingFee, paymentProvider, saveLastOrder } from "@/lib/payment";
import type { FulfillmentMode } from "@/types/product";
import { Button } from "@/components/ui/button";

const checkoutSchema = z
  .object({
    firstName: z.string().trim().min(2, "Le prénom est requis (2 caractères minimum)."),
    lastName: z.string().trim().min(2, "Le nom est requis (2 caractères minimum)."),
    email: z.string().trim().min(1, "L'adresse e-mail est requise.").email("Adresse e-mail invalide."),
    phone: z
      .string()
      .trim()
      .min(1, "Le téléphone est requis.")
      .regex(/^(?:\+212|0)\s?\d(?:[\s.-]?\d{2}){4}$/, "Numéro marocain invalide. Ex. : 06 12 34 56 78"),
    fulfillment: z.enum(["delivery", "pickup"], {
      message: "Choisissez une option de retrait.",
    }),
    address: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    note: z.string().max(400, "400 caractères maximum.").optional(),
  })
  .superRefine((values, ctx) => {
    if (values.fulfillment !== "delivery") return;
    if (!values.address || values.address.trim().length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address"],
        message: "L'adresse est requise pour la livraison (5 caractères minimum).",
      });
    }
    if (!values.city || values.city.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["city"],
        message: "La ville est requise pour la livraison.",
      });
    }
  });

type CheckoutValues = z.infer<typeof checkoutSchema>;

const fieldClasses =
  "w-full rounded-2xl border-2 border-chocolate/15 bg-white px-4 py-3 text-sm placeholder:text-chocolate/35 focus:border-chocolate/45 focus:outline-none";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs font-semibold text-bakery-orange" role="alert">
      {message}
    </p>
  );
}

export function CheckoutForm() {
  const router = useRouter();
  const { lines, subtotal, clearCart, itemCount } = useCart();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      fulfillment: "delivery",
      address: "",
      city: "",
      postalCode: "",
      note: "",
    },
  });

  const fulfillment = watch("fulfillment") as FulfillmentMode;
  const shippingFee = computeShippingFee(subtotal, fulfillment);
  const total = subtotal + shippingFee;

  async function onSubmit(values: CheckoutValues) {
    setSubmitError(null);
    try {
      const result = await paymentProvider.processOrder({
        items: lines.map((line) => ({
          name: line.name,
          quantity: line.quantity,
          unitPrice: line.unitPrice,
          variantLabel: line.variantLabel,
        })),
        subtotal,
        fulfillment: values.fulfillment,
        customer: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          address: values.address,
          city: values.city,
          postalCode: values.postalCode,
          note: values.note,
        },
      });

      if (!result.success) {
        setSubmitError(result.message);
        return;
      }

      saveLastOrder(result.order);
      clearCart();
      router.push("/checkout/success");
    } catch {
      setSubmitError("Une erreur est survenue lors du traitement de la commande de démonstration.");
    }
  }

  if (lines.length === 0 && !isSubmitting) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-[1.75rem] border border-dashed border-chocolate/25 px-6 py-20 text-center">
        <AlertTriangle className="h-10 w-10 text-bakery-orange" aria-hidden="true" />
        <h2 className="font-display text-3xl uppercase">Panier vide</h2>
        <p className="max-w-md text-sm text-chocolate/60">
          Ajoutez au moins une création à votre panier avant de passer commande.
        </p>
        <Button href="/shop" size="lg">
          Voir la boutique
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-10">
        <section aria-labelledby="customer-info-title" className="flex flex-col gap-5">
          <h2 id="customer-info-title" className="font-display text-2xl uppercase">
            Vos coordonnées
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold">
                Prénom <span aria-hidden="true">*</span>
              </label>
              <input
                id="firstName"
                autoComplete="given-name"
                aria-invalid={errors.firstName ? true : undefined}
                className={fieldClasses}
                placeholder="Salma"
                {...register("firstName")}
              />
              <FieldError message={errors.firstName?.message} />
            </div>
            <div>
              <label htmlFor="lastName" className="mb-1.5 block text-sm font-semibold">
                Nom <span aria-hidden="true">*</span>
              </label>
              <input
                id="lastName"
                autoComplete="family-name"
                aria-invalid={errors.lastName ? true : undefined}
                className={fieldClasses}
                placeholder="Benali"
                {...register("lastName")}
              />
              <FieldError message={errors.lastName?.message} />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
                E-mail <span aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={errors.email ? true : undefined}
                className={fieldClasses}
                placeholder="salma@exemple.ma"
                {...register("email")}
              />
              <FieldError message={errors.email?.message} />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">
                Téléphone <span aria-hidden="true">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                aria-invalid={errors.phone ? true : undefined}
                className={fieldClasses}
                placeholder="06 12 34 56 78"
                {...register("phone")}
              />
              <FieldError message={errors.phone?.message} />
            </div>
          </div>
        </section>

        <section aria-labelledby="fulfillment-title" className="flex flex-col gap-5">
          <h2 id="fulfillment-title" className="font-display text-2xl uppercase">
            Retrait ou livraison
          </h2>
          <div className="grid gap-4 sm:grid-cols-2" role="radiogroup" aria-label="Mode de retrait">
            {(
              [
                {
                  value: "delivery",
                  title: "Livraison à domicile",
                  description: "25 DH — offerte dès 150 DH.",
                },
                {
                  value: "pickup",
                  title: "Retrait en boutique",
                  description: "Gratuit — 12, rue des Fournils, Marrakech.",
                },
              ] as Array<{ value: FulfillmentMode; title: string; description: string }>
            ).map((option) => (
              <label
                key={option.value}
                className={
                  "cursor-pointer rounded-2xl border-2 p-4 transition-colors " +
                  (fulfillment === option.value
                    ? "border-chocolate bg-bakery-yellow/25"
                    : "border-chocolate/15 bg-white hover:border-chocolate/35")
                }
              >
                <input
                  type="radio"
                  value={option.value}
                  className="sr-only"
                  {...register("fulfillment")}
                />
                <span className="block font-display text-lg uppercase">{option.title}</span>
                <span className="mt-1 block text-xs text-chocolate/65">{option.description}</span>
              </label>
            ))}
          </div>

          {fulfillment === "delivery" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="address" className="mb-1.5 block text-sm font-semibold">
                  Adresse <span aria-hidden="true">*</span>
                </label>
                <input
                  id="address"
                  autoComplete="street-address"
                  aria-invalid={errors.address ? true : undefined}
                  className={fieldClasses}
                  placeholder="12, avenue Hassan II, appt 4"
                  {...register("address")}
                />
                <FieldError message={errors.address?.message} />
              </div>
              <div>
                <label htmlFor="city" className="mb-1.5 block text-sm font-semibold">
                  Ville <span aria-hidden="true">*</span>
                </label>
                <input
                  id="city"
                  autoComplete="address-level2"
                  aria-invalid={errors.city ? true : undefined}
                  className={fieldClasses}
                  placeholder="Marrakech"
                  {...register("city")}
                />
                <FieldError message={errors.city?.message} />
              </div>
              <div>
                <label htmlFor="postalCode" className="mb-1.5 block text-sm font-semibold">
                  Code postal
                </label>
                <input
                  id="postalCode"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  className={fieldClasses}
                  placeholder="40000"
                  {...register("postalCode")}
                />
                <FieldError message={errors.postalCode?.message} />
              </div>
            </div>
          ) : null}

          <div>
            <label htmlFor="note" className="mb-1.5 block text-sm font-semibold">
              Note pour le fournil (optionnel)
            </label>
            <textarea
              id="note"
              rows={3}
              aria-invalid={errors.note ? true : undefined}
              className={fieldClasses}
              placeholder="Message sur le gâteau, allergies, créneau de retrait…"
              {...register("note")}
            />
            <FieldError message={errors.note?.message} />
          </div>
        </section>

        <div aria-live="polite">
          {submitError ? (
            <p className="rounded-2xl border-2 border-bakery-orange/40 bg-bakery-orange/10 px-4 py-3 text-sm font-semibold text-chocolate">
              {submitError}
            </p>
          ) : null}
        </div>

        <div>
          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Traitement de la commande…
              </>
            ) : (
              "Confirmer la commande de démonstration"
            )}
          </Button>
          <p className="mt-3 text-xs text-chocolate/55">
            Mode démonstration : aucun paiement n'est encaissé, aucune donnée n'est transmise
            et aucun compte n'est créé.
          </p>
        </div>
      </form>

      <aside
        aria-label="Récapitulatif de commande"
        className="h-fit rounded-[1.75rem] bg-chocolate p-6 text-cream sm:p-8 lg:sticky lg:top-8"
      >
        <h2 className="font-display text-2xl uppercase">Votre commande</h2>
        <ul className="mt-6 flex flex-col gap-4 text-sm">
          {lines.map((line) => (
            <li key={line.key} className="flex justify-between gap-4">
              <span className="text-cream/80">
                {line.quantity} × {line.name}
                {line.variantLabel ? ` (${line.variantLabel})` : ""}
              </span>
              <span className="shrink-0 font-semibold">
                {formatPrice(line.unitPrice * line.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-6 flex flex-col gap-3 border-t border-cream/15 pt-5 text-sm">
          <div className="flex justify-between">
            <dt className="text-cream/70">Sous-total ({itemCount} article{itemCount === 1 ? "" : "s"})</dt>
            <dd className="font-semibold">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-cream/70">
              {fulfillment === "pickup" ? "Retrait boutique" : "Livraison"}
            </dt>
            <dd className="font-semibold">
              {shippingFee === 0 ? "Offerte" : formatPrice(shippingFee)}
            </dd>
          </div>
          <div className="mt-2 flex justify-between border-t border-cream/15 pt-4 text-base">
            <dt className="font-display uppercase">Total</dt>
            <dd className="font-display">{formatPrice(total)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
