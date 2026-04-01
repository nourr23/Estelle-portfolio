"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin({ locale }: { locale: "fr" | "en" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t =
    locale === "fr"
      ? {
          title: "Administration",
          hint: "Connexion requise.",
          email: "Email",
          password: "Mot de passe",
          submit: "Se connecter",
          bad: "Identifiants incorrects.",
          forbidden: "Accès non autorisé.",
          fail: "Impossible de se connecter.",
        }
      : {
          title: "Admin",
          hint: "Login required.",
          email: "Email",
          password: "Password",
          submit: "Sign in",
          bad: "Incorrect credentials.",
          forbidden: "Not authorized.",
          fail: "Could not sign in.",
        };

  return (
    <div className="mx-auto max-w-md rounded-xl border border-[#d5b162]/25 bg-white/70 p-6">
      <h1 className="text-2xl font-semibold text-[#1c1b19]">{t.title}</h1>
      <p className="mt-2 text-sm text-[#5f5a50]">{t.hint}</p>

      <form
        className="mt-6 space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setError(null);
          try {
            const res = await fetch("/api/admin/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
              setError(res.status === 401 ? t.bad : res.status === 403 ? t.forbidden : t.fail);
              return;
            }
            setEmail("");
            setPassword("");
            router.refresh();
          } catch {
            setError(t.fail);
          } finally {
            setLoading(false);
          }
        }}
      >
        <label className="block text-sm font-semibold text-[#1c1b19]">
          {t.email}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-md border border-[#d5b162]/35 bg-white px-3 py-2 text-sm text-[#1c1b19] outline-none focus:border-[#43c6c8]/60"
          />
        </label>
        <label className="block text-sm font-semibold text-[#1c1b19]">
          {t.password}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-md border border-[#d5b162]/35 bg-white px-3 py-2 text-sm text-[#1c1b19] outline-none focus:border-[#43c6c8]/60"
          />
        </label>
        {error ? <p className="text-sm font-semibold text-red-700">{error}</p> : null}
        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full rounded-md bg-[#111111] px-4 py-2.5 text-sm font-semibold text-[#d5b162] transition hover:bg-[#2a2a2a] disabled:opacity-60"
        >
          {loading ? (locale === "fr" ? "Connexion…" : "Signing in…") : t.submit}
        </button>
      </form>
    </div>
  );
}

