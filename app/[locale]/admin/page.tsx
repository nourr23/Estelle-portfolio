import { cookies } from "next/headers";
import { getDictionary, type Locale } from "../../../dictionaries";
import AdminLogin from "../../../components/admin/AdminLogin";
import AdminDashboard from "../../../components/admin/AdminDashboard";
import { isValidAdminSessionToken } from "../../../lib/adminAuth";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  await getDictionary(resolvedLocale); // keeps locale consistent with the rest of the app

  const jar = await cookies();
  const token = jar.get("admin_session")?.value ?? null;
  const authed = isValidAdminSessionToken(token);

  return (
    <div className="min-h-screen bg-[#f5efe4] font-sans text-[#1a1a1a]">
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        {authed ? <AdminDashboard locale={resolvedLocale} /> : <AdminLogin locale={resolvedLocale} />}
      </main>
    </div>
  );
}

