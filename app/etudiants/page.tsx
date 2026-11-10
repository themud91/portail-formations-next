import { etudiants } from "@/lib/donnees-fictives";

export default function Etudiants() {
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
