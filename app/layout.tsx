import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Collège ABC",
  description: "Premier projet Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>

        <header className="header">
          <div className="headerContainer">

            <h1 className="logo">Collège ABC</h1>

            <nav className="navigation">
              <Link href="/">Accueil</Link>
              <Link href="/etudiants">Étudiants</Link>
              <Link href="/formations">Formations</Link>
              <Link href="/gestion">Gestion</Link>
              <Link href="/contact">Contact</Link>
            </nav>

          </div>
        </header>

        <main className="main">
          {children}
        </main>

        <footer className="footer">
          <p>© 2026 Collège ABC</p>
        </footer>

      </body>
    </html>
  );
}