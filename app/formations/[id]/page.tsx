import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

// Lit la base de donnees a chaque visite, sans fixer les donnees lors du build
// doc : https://nextjs.org/docs/app/guides/caching-without-cache-components#route-segment-config
export const dynamic = "force-dynamic";

export default async function FormationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const formationId = Number(id);

  if (!Number.isInteger(formationId)) {
    notFound();
  }

  const formation = await prisma.formation.findUnique({
    where: { id: formationId },
    include: { cours: true, etudiants: true },
  });

  if (!formation) {
    notFound();
  }

  return (
    <section className="formationsPage">

      <h1 className="formationsTitle">
        {formation.nom}
      </h1>

      <p className="formationsDescription">
        {formation.description ?? "Aucune description."}
      </p>

      <div className="formationsList">

        <article className="formationCard">
          <h2 className="formationTitle">Cours</h2>

          {formation.cours.length === 0 ? (
            <p>Aucun cours pour cette formation.</p>
          ) : (
            <ul>
              {formation.cours.map((cours) => (
                <li key={cours.id}>{cours.titre}</li>
              ))}
            </ul>
          )}
        </article>

        <article className="formationCard">
          <h2 className="formationTitle">Étudiants inscrits</h2>

          {formation.etudiants.length === 0 ? (
            <p>Aucun étudiant inscrit.</p>
          ) : (
            <ul>
              {formation.etudiants.map((etudiant) => (
                <li key={etudiant.id}>{etudiant.nom}</li>
              ))}
            </ul>
          )}
        </article>

      </div>

      <Link
        href="/formations"
        className="formationButton"
        style={{ display: "inline-block" }}
      >
        Retour aux formations
      </Link>

    </section>
  );
}
