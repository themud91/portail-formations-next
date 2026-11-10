// Donnees fictives pour le deploiement (Parcours A, sans SQLite)
// Meme forme que les resultats de Prisma pour garder le JSX inchange

const formationsBase = [
  {
    id: 1,
    nom: "Administration",
    description: "Gestion, comptabilité et leadership d'entreprise.",
    cours: [
      { id: 1, titre: "Comptabilité" },
      { id: 2, titre: "Gestion de projet" },
    ],
  },
  {
    id: 2,
    nom: "Informatique",
    description: "Programmation web, bases de données et développement d'applications.",
    cours: [
      { id: 3, titre: "Programmation web" },
      { id: 4, titre: "Bases de données" },
      { id: 5, titre: "React et Next.js" },
    ],
  },
  {
    id: 3,
    nom: "Sciences",
    description: "Formation préuniversitaire en sciences de la nature.",
    cours: [
      { id: 6, titre: "Biologie" },
      { id: 7, titre: "Chimie" },
    ],
  },
];

const etudiantsBase = [
  { id: 1, nom: "Alice Tremblay", bio: "Passionnée de développement web.", formationIds: [2] },
  { id: 2, nom: "Karim Benali", bio: "Intéressé par la gestion et la technologie.", formationIds: [1, 2] },
  { id: 3, nom: "Sophie Gagnon", bio: null, formationIds: [3] },
];

export const formations = formationsBase.map((f) => ({
  ...f,
  etudiants: etudiantsBase
    .filter((e) => e.formationIds.includes(f.id))
    .map(({ id, nom }) => ({ id, nom })),
}));

export const etudiants = etudiantsBase.map((e) => ({
  id: e.id,
  nom: e.nom,
  profil: e.bio ? { bio: e.bio } : null,
  formations: formationsBase
    .filter((f) => e.formationIds.includes(f.id))
    .map(({ id, nom }) => ({ id, nom })),
}));
