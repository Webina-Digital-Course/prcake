"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Votre nom est requis (2 caractères minimum)."),
  email: z.string().trim().min(1, "L'adresse e-mail est requise.").email("Adresse e-mail invalide."),
  subject: z.string().trim().min(3, "Indiquez un sujet (3 caractères minimum)."),
  message: z
    .string()
    .trim()
    .min(10, "Votre message doit contenir au moins 10 caractères.")
    .max(1000, "1000 caractères maximum."),
});

type ContactValues = z.infer<typeof contactSchema>;

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

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(_values: ContactValues) {
    // Démo : aucune donnée n'est envoyée. Remplacer par un appel API serveur plus tard.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSent(true);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold">
            Nom <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            className={fieldClasses}
            placeholder="Votre nom"
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold">
            E-mail <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            className={fieldClasses}
            placeholder="vous@exemple.ma"
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-semibold">
          Sujet <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-subject"
          aria-invalid={errors.subject ? true : undefined}
          className={fieldClasses}
          placeholder="Commande pour un événement"
          {...register("subject")}
        />
        <FieldError message={errors.subject?.message} />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={6}
          aria-invalid={errors.message ? true : undefined}
          className={fieldClasses}
          placeholder="Dites-nous tout…"
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      <div aria-live="polite">
        {sent ? (
          <p className="flex items-center gap-2 rounded-2xl border-2 border-chocolate/10 bg-bakery-yellow/25 px-4 py-3 text-sm font-semibold text-chocolate">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-bakery-orange" aria-hidden="true" />
            Merci ! Votre message a bien été pris en charge (démonstration — rien n'a été
            envoyé).
          </p>
        ) : null}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-bakery-yellow px-8 py-4 font-display uppercase tracking-wide text-chocolate transition-colors hover:bg-[#ffef6b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Envoi…
            </>
          ) : (
            "Envoyer le message"
          )}
        </button>
        <p className="mt-3 text-xs text-chocolate/55">
          Formulaire de démonstration : aucune donnée n'est stockée ni transmise.
        </p>
      </div>
    </form>
  );
}
