import { prisma } from "@/lib/prisma";

// Lit la base de donnees a chaque visite, sans fixer les donnees lors du build
// doc : https://nextjs.org/docs/app/guides/caching-without-cache-components#route-segment-config
export const dynamic = "force-dynamic";

export default async function Etudiants() {
  const etudiants = await prisma.etudiant.findMany({
    include: { profil: true, formations: true },
    orderBy: { id: "asc" },
  });

  return (
    <section className="studentsPage">

      <h1 className="studentsTitle">
        Nos étudiants
      </h1>

      <p className="studentsDescription">
        Voici les étudiants inscrits au Collège ABC.
      </p>

      <div className="studentsCards">

        {etudiants.length === 0 && (
          <p>Aucun étudiant pour le moment.</p>
        )}

        {etudiants.map((etudiant) => (
          <div
            className="studentCard"
            key={etudiant.id}
          >

            <div className="studentAvatar">
              {etudiant.nom.charAt(0)}
            </div>

            <h2>{etudiant.nom}</h2>

            <p>
              Formations :
              <strong>
                {" "}
                {etudiant.formations.length > 0
                  ? etudiant.formations.map((f) => f.nom).join(", ")
                  : "Aucune"}
              </strong>
            </p>

            {etudiant.profil?.bio && (
              <p>{etudiant.profil.bio}</p>
            )}

          </div>
        ))}

      </div>

    </section>
  );
}
