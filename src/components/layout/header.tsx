"use client";

import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/data/navigation";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/layout/wordmark";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setOpenGroup(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="relative z-40 border-b border-chocolate/10 bg-cream">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <Wordmark className="text-2xl sm:text-3xl" />

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  aria-expanded={openGroup === item.label}
                  onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                  className="flex items-center gap-1 rounded-full px-4 py-2 font-display text-sm uppercase tracking-wide text-chocolate transition-colors hover:bg-chocolate/5"
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      openGroup === item.label && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={cn(
                    "absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3",
                    "invisible translate-y-1 opacity-0 transition-all duration-150",
                    "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
                    openGroup === item.label && "visible translate-y-0 opacity-100",
                  )}
                >
                  <ul className="overflow-hidden rounded-2xl border border-chocolate/10 bg-white p-2 shadow-[0_14px_40px_-18px_rgba(53,31,29,0.45)]">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-chocolate transition-colors hover:bg-cream"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href ?? "/"}
                className="rounded-full px-4 py-2 font-display text-sm uppercase tracking-wide text-chocolate transition-colors hover:bg-chocolate/5"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            aria-label={`Panier, ${itemCount} article${itemCount === 1 ? "" : "s"}`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-chocolate/15 text-chocolate transition-colors hover:bg-chocolate/5"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span
              className={cn(
                "absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-bakery-orange px-1 font-display text-xs leading-none text-chocolate",
                itemCount === 0 && "bg-chocolate/20 text-chocolate/60",
              )}
            >
              {itemCount}
            </span>
          </Link>

          <Button href="/shop" size="sm" className="hidden sm:inline-flex">
            Commander
          </Button>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="navigation-mobile"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-chocolate/15 text-chocolate lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="navigation-mobile"
        hidden={!mobileOpen}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-8rem)] overflow-y-auto border-b border-chocolate/10 bg-cream px-4 pb-8 pt-2 shadow-[0_20px_40px_-24px_rgba(53,31,29,0.5)] lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="flex flex-col gap-1">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.label} className="border-b border-chocolate/10 py-2">
                <button
                  type="button"
                  aria-expanded={openGroup === item.label}
                  onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                  className="flex w-full items-center justify-between rounded-xl px-2 py-3 font-display text-lg uppercase tracking-wide"
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 transition-transform",
                      openGroup === item.label && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>
                {openGroup === item.label ? (
                  <ul className="mb-2 ml-2 flex flex-col gap-1 border-l-2 border-bakery-orange/60 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-lg px-2 py-2.5 text-base font-semibold text-chocolate/80"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href ?? "/"}
                className="border-b border-chocolate/10 px-2 py-3.5 font-display text-lg uppercase tracking-wide"
              >
                {item.label}
              </Link>
            ),
          )}
          <Button href="/shop" size="md" className="mt-4 w-full">
            Commander
          </Button>
        </nav>
      </div>
    </header>
  );
}
