"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "L'adresse e-mail est requise.")
    .email("Veuillez saisir une adresse e-mail valide."),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(_values: NewsletterValues) {
    // Démo : aucun envoi réel. Brancher ici un appel API côté serveur plus tard.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Adresse e-mail
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="votre@email.ma"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "newsletter-email-error" : undefined}
            className="w-full rounded-full border-2 border-cream/25 bg-chocolate-soft px-6 py-4 text-cream placeholder:text-cream/45 focus:border-bakery-yellow focus:outline-none"
            {...register("email")}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-bakery-yellow px-8 py-4 font-display uppercase tracking-wide text-chocolate transition-colors hover:bg-[#ffef6b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Inscription…
            </>
          ) : (
            "S'inscrire"
          )}
        </button>
      </div>

      <div aria-live="polite" className="mt-3 min-h-6">
        {errors.email ? (
          <p id="newsletter-email-error" className="text-sm font-semibold text-bakery-orange">
            {errors.email.message}
          </p>
        ) : null}
        {status === "success" && !errors.email ? (
          <p className="text-sm font-semibold text-bakery-yellow">
            Merci ! Vous êtes inscrit(e) à la newsletter ROLLIN (démonstration — aucun e-mail
            n'a réellement été envoyé).
          </p>
        ) : null}
      </div>
    </form>
  );
}
