import { prisma } from "@/lib/prisma";

import {
  createFormation,
  updateFormation,
  deleteFormation,
  createCours,
  createEtudiant,
  updateEtudiant,
  deleteEtudiant,
  createProfil,
} from "./actions";

// Classes Tailwind reutilisees
const card =
  "rounded-xl border border-slate-200 bg-white p-5 shadow-sm";
const label = "mb-2 block font-medium";
const field =
  "w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
const btnAdd =
  "rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700";
const btnEdit =
  "cursor-pointer rounded-lg bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600";
const btnDelete =
  "rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700";

export default async function GestionPage() {

  // Lecture des formations (cours + etudiants)

  const formations =
    await prisma.formation.findMany({
      include: {
        cours: true,
        etudiants: true,
      },

      orderBy: {
        id: "desc",
      },
    });


  // Lecture des etudiants (profil + formations)

  const etudiants =
    await prisma.etudiant.findMany({
      include: {
        profil: true,
        formations: true,
      },

      orderBy: {
        id: "desc",
      },
    });


  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">

      <div className="mx-auto max-w-6xl space-y-12">

        <h1 className="text-3xl font-bold text-slate-900">
          Gestion
        </h1>

        <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
          Avertissement : cette page utilise une base SQLite locale. En
          production sur Vercel, les modifications ne sont pas durables.
        </p>


        {/* ==================================
            A. GESTION DES FORMATIONS
        ================================== */}

        <section>

          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            A. Gestion des formations
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

            {/* Colonne 1 : formulaires d'ajout */}

            <div className="space-y-6 lg:col-span-1">

              <div className={card}>

                <h3 className="mb-4 text-lg font-semibold">
                  Ajouter une formation
                </h3>

                <form action={createFormation} className="space-y-4">

                  <div>
                    <label htmlFor="nomFormation" className={label}>
                      Nom
                    </label>
                    <input
                      id="nomFormation"
                      name="nomFormation"
                      type="text"
                      required
                      className={field}
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className={label}>
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className={field}
                    />
                  </div>

                  <button type="submit" className={btnAdd}>
                    Ajouter la formation
                  </button>

                </form>

              </div>


              {/* Relation 1:n */}

              <div className={card}>

                <h3 className="mb-4 text-lg font-semibold">
                  Ajouter un cours
                </h3>

                <form action={createCours} className="space-y-4">

                  <div>
                    <label htmlFor="titre" className={label}>
                      Titre du cours
                    </label>
                    <input
                      id="titre"
                      name="titre"
                      type="text"
                      required
                      className={field}
                    />
                  </div>

                  <div>
                    <label htmlFor="formationId" className={label}>
                      Formation
                    </label>
                    <select
                      id="formationId"
                      name="formationId"
                      required
                      className={field}
                    >
                      <option value="">
                        Choisir une formation
                      </option>

                      {formations.map((formation) => (
                        <option key={formation.id} value={formation.id}>
                          {formation.nom}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className={btnAdd}>
                    Ajouter le cours
                  </button>

                </form>

              </div>

            </div>


            {/* Colonne 2 : liste des formations */}

            <div className="space-y-4 lg:col-span-2">

              {formations.length === 0 ? (

                <p className="text-slate-600">
                  Aucune formation.
                </p>

              ) : (

                formations.map((formation) => (

                  <article key={formation.id} className={card}>

                    <h3 className="text-lg font-semibold">
                      {formation.nom}
                    </h3>

                    <p className="mt-2 text-slate-600">
                      {formation.description}
                    </p>


                    {/* 1:n */}

                    <h4 className="mt-4 font-medium">
                      Cours
                    </h4>

                    {formation.cours.length === 0 ? (
                      <p className="text-sm text-slate-600">
                        Aucun cours.
                      </p>
                    ) : (
                      <ul className="list-disc pl-5 text-sm text-slate-600">
                        {formation.cours.map((cours) => (
                          <li key={cours.id}>{cours.titre}</li>
                        ))}
                      </ul>
                    )}


                    {/* n:n */}

                    <h4 className="mt-4 font-medium">
                      Étudiants inscrits
                    </h4>

                    {formation.etudiants.length === 0 ? (
                      <p className="text-sm text-slate-600">
                        Aucun étudiant.
                      </p>
                    ) : (
                      <ul className="list-disc pl-5 text-sm text-slate-600">
                        {formation.etudiants.map((etudiant) => (
                          <li key={etudiant.id}>{etudiant.nom}</li>
                        ))}
                      </ul>
                    )}


                    {/* Modifier / Supprimer */}

                    <div className="mt-5 flex items-start gap-3">

                      <details className="flex-1">

                        <summary className={`${btnEdit} inline-block`}>
                          Modifier
                        </summary>

                        <form
                          action={updateFormation}
                          className="mt-4 space-y-4"
                        >
                          <input
                            type="hidden"
                            name="id"
                            value={formation.id}
                          />

                          <input
                            name="nomFormation"
                            defaultValue={formation.nom}
                            required
                            className={field}
                          />

                          <textarea
                            name="description"
                            defaultValue={formation.description ?? ""}
                            className={field}
                          />

                          <button type="submit" className={btnAdd}>
                            Enregistrer
                          </button>
                        </form>

                      </details>

                      <form action={deleteFormation}>
                        <input
                          type="hidden"
                          name="id"
                          value={formation.id}
                        />
                        <button type="submit" className={btnDelete}>
                          Supprimer
                        </button>
                      </form>

                    </div>

                  </article>

                ))

              )}

            </div>

          </div>

        </section>


        {/* ==================================
            B. GESTION DES ETUDIANTS
        ================================== */}

        <section>

          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            B. Gestion des étudiants
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

            {/* Colonne 1 : formulaires d'ajout */}

            <div className="space-y-6 lg:col-span-1">

              {/* Relation n:n */}

              <div className={card}>

                <h3 className="mb-4 text-lg font-semibold">
                  Ajouter un étudiant
                </h3>

                <form action={createEtudiant} className="space-y-4">

                  <div>
                    <label htmlFor="nomEtudiant" className={label}>
                      Nom
                    </label>
                    <input
                      id="nomEtudiant"
                      name="nomEtudiant"
                      type="text"
                      required
                      className={field}
                    />
                  </div>

                  <div>
                    <label htmlFor="formations" className={label}>
                      Formations
                    </label>
                    <select
                      id="formations"
                      name="formations"
                      multiple
                      className={field}
                    >
                      {formations.map((formation) => (
                        <option key={formation.id} value={formation.id}>
                          {formation.nom}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className={btnAdd}>
                    Ajouter un étudiant
                  </button>

                </form>

              </div>


              {/* Relation 1:0..1 */}

              <div className={card}>

                <h3 className="mb-4 text-lg font-semibold">
                  Ajouter un profil
                </h3>

                <form action={createProfil} className="space-y-4">

                  <div>
                    <label htmlFor="etudiantId" className={label}>
                      Étudiant
                    </label>
                    <select
                      id="etudiantId"
                      name="etudiantId"
                      required
                      className={field}
                    >
                      <option value="">
                        Choisir un étudiant
                      </option>

                      {etudiants
                        .filter((etudiant) => !etudiant.profil)
                        .map((etudiant) => (
                          <option key={etudiant.id} value={etudiant.id}>
                            {etudiant.nom}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="bio" className={label}>
                      Biographie
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      className={field}
                    />
                  </div>

                  <button type="submit" className={btnAdd}>
                    Ajouter le profil
                  </button>

                </form>

              </div>

            </div>


            {/* Colonne 2 : liste des etudiants */}

            <div className="space-y-4 lg:col-span-2">

              {etudiants.length === 0 ? (

                <p className="text-slate-600">
                  Aucun étudiant.
                </p>

              ) : (

                etudiants.map((etudiant) => (

                  <article key={etudiant.id} className={card}>

                    <h3 className="text-lg font-semibold">
                      {etudiant.nom}
                    </h3>


                    {/* 1:0..1 */}

                    <p className="mt-2 text-slate-600">
                      Profil :{" "}
                      {etudiant.profil?.bio ?? "Aucun profil"}
                    </p>


                    {/* n:n */}

                    <h4 className="mt-4 font-medium">
                      Formations suivies
                    </h4>

                    {etudiant.formations.length === 0 ? (
                      <p className="text-sm text-slate-600">
                        Aucune formation.
                      </p>
                    ) : (
                      <ul className="list-disc pl-5 text-sm text-slate-600">
                        {etudiant.formations.map((formation) => (
                          <li key={formation.id}>{formation.nom}</li>
                        ))}
                      </ul>
                    )}


                    {/* Modifier / Supprimer */}

                    <div className="mt-5 flex items-start gap-3">

                      <details className="flex-1">

                        <summary className={`${btnEdit} inline-block`}>
                          Modifier
                        </summary>

                        <form
                          action={updateEtudiant}
                          className="mt-4 space-y-4"
                        >
                          <input
                            type="hidden"
                            name="id"
                            value={etudiant.id}
                          />

                          <input
                            name="nomEtudiant"
                            defaultValue={etudiant.nom}
                            required
                            className={field}
                          />

                          <select
                            name="formations"
                            multiple
                            defaultValue={etudiant.formations.map((f) =>
                              String(f.id)
                            )}
                            className={field}
                          >
                            {formations.map((formation) => (
                              <option key={formation.id} value={formation.id}>
                                {formation.nom}
                              </option>
                            ))}
                          </select>

                          <button type="submit" className={btnAdd}>
                            Enregistrer
                          </button>
                        </form>

                      </details>

                      <form action={deleteEtudiant}>
                        <input
                          type="hidden"
                          name="id"
                          value={etudiant.id}
                        />
                        <button type="submit" className={btnDelete}>
                          Supprimer
                        </button>
                      </form>

                    </div>

                  </article>

                ))

              )}

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
