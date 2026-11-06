import { Header } from "@/components/biztra/header";
import { Footer } from "@/components/biztra/footer";
import { getSiteSettings, type SiteSettings } from "@/lib/content";

export async function SiteShell({
  children,
  settings: passedSettings,
}: {
  children: React.ReactNode;
  settings?: SiteSettings;
}) {
  // Use passed settings if available; otherwise fetch from DB
  const settings = passedSettings ?? (await getSiteSettings()) ?? undefined;
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
