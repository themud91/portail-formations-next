import Link from "next/link";
import { notFound } from "next/navigation";
import { formations } from "@/lib/donnees-fictives";

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

  const formation = formations.find((f) => f.id === formationId);

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
