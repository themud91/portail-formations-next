import type { Metadata } from "next";
import Link from "next/link";
import { Poppins } from "next/font/google";
import "./globals.css";

const police = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Collège La Pocatière",
  description: "Premier projet Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={police.className}>

        <header className="header">
          <div className="headerContainer">

            <h1 className="logo">Collège La Pocatière</h1>

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
          <p>© 2026 Collège La Pocatière</p>
        </footer>

      </body>
    </html>
  );
}