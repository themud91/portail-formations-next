import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Lit la base de donnees a chaque visite, sans fixer les donnees lors du build
// doc : https://nextjs.org/docs/app/guides/caching-without-cache-components#route-segment-config
export const dynamic = "force-dynamic";

export default async function Formations() {
  const formations = await prisma.formation.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <section className="formationsPage">

      <Image
        src="/formations.jpg"
        alt="Auditorium du collège pendant un cours"
        width={2000}
        height={1500}
        priority
        className="mb-8 h-48 w-full rounded-xl object-cover md:h-72"
      />

      <h1 className="formationsTitle">
        Nos formations
      </h1>

      <p className="formationsDescription">
        Découvrez les programmes offerts par notre collège.
      </p>

      <div className="formationsList">

        {formations.length === 0 && (
          <p>Aucune formation pour le moment.</p>
        )}

        {formations.map((formation) => (
          <article
            key={formation.id}
            className="formationCard"
          >

            <h2 className="formationTitle">
              {formation.nom}
            </h2>

            <p className="formationDescription">
              {formation.description ?? "Aucune description."}
            </p>

            <Link
              href={`/formations/${formation.id}`}
              className="formationButton"
              style={{ display: "inline-block" }}
            >
              Voir détails
            </Link>

          </article>
        ))}

      </div>

    </section>
  );
}
