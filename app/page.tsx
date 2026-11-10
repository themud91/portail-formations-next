import Link from "next/link";

export default function Home() {
  return (
    <div>

      <section className="homeHero">
        <div className="homeHeroContent">

          <h1>Bienvenue au Collège ABC</h1>

          <p>
            Découvrez nos programmes, nos étudiants et notre environnement
            dapprentissage.
          </p>

          <Link href="/formations" className="homeButton">
            Voir nos formations
          </Link>

        </div>
      </section>

      <section className="homeSection">

        <h2>Découvrez notre collège</h2>

        <div className="homeCards">

          <div className="homeCard">
            <h3>Étudiants</h3>

            <p>
              Découvrez quelques étudiants inscrits dans notre collège.
            </p>

            <Link href="/etudiants">
              Voir les étudiants
            </Link>
          </div>

          <div className="homeCard">
            <h3>Formations</h3>

            <p>
              Consultez les différents programmes disponibles.
            </p>

            <Link href="/formations">
              Voir les formations
            </Link>
          </div>

          <div className="homeCard">
            <h3>Contact</h3>

            <p>
              Vous avez une question ? Communiquez avec nous.
            </p>

            <Link href="/contact">
              Nous contacter
            </Link>
          </div>

        </div>

      </section>

    </div>
  );
}