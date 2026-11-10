"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


// ==========================
// CREATE FORMATION
// ==========================

export async function createFormation(
  formData: FormData
) {
  const nom = String(
    formData.get("nomFormation") ?? ""
  ).trim();

  const description = String(
    formData.get("description") ?? ""
  ).trim();

  if (!nom) {
    return;
  }

  await prisma.formation.create({
    data: {
      nom,
      description,
    },
  });

  revalidatePath("/gestion");
}


// ==========================
// CREATE COURS
// Relation 1:n
// ==========================

export async function createCours(
  formData: FormData
) {
  const titre = String(
    formData.get("titre") ?? ""
  ).trim();

  const formationId = Number(
    formData.get("formationId")
  );

  if (!titre || !formationId) {
    return;
  }

  await prisma.cours.create({
    data: {
      titre,
      formationId,
    },
  });

  revalidatePath("/gestion");
}


// ==========================
// CREATE ETUDIANT
// Relation n:n
// ==========================

export async function createEtudiant(
  formData: FormData
) {
  const nom = String(
    formData.get("nomEtudiant") ?? ""
  ).trim();

  const formationIds = formData
    .getAll("formations")
    .map((id) => Number(id))
    .filter((id) => !Number.isNaN(id));

  if (!nom) {
    return;
  }

  await prisma.etudiant.create({
    data: {
      nom,

      formations: {
        connect: formationIds.map(
          (id) => ({
            id,
          })
        ),
      },
    },
  });

  revalidatePath("/gestion");
}


// ==========================
// CREATE PROFIL
// Relation 1:1
// ==========================

export async function createProfil(
  formData: FormData
) {
  const bio = String(
    formData.get("bio") ?? ""
  ).trim();

  const etudiantId = Number(
    formData.get("etudiantId")
  );

  if (!etudiantId) {
    return;
  }

  await prisma.profil.create({
    data: {
      bio,
      etudiantId,
    },
  });

  revalidatePath("/gestion");
}


// Update formation

export async function updateFormation(formData: FormData) {
  const id = Number(formData.get("id"));
  const nom = String(formData.get("nomFormation") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!id || !nom) {
    return;
  }

  await prisma.formation.update({
    where: { id },
    data: { nom, description },
  });

  revalidatePath("/gestion");
}


// Delete formation

export async function deleteFormation(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!id) {
    return;
  }

  // Cours dependants d'abord (FK), puis la formation
  await prisma.$transaction([
    prisma.cours.deleteMany({ where: { formationId: id } }),
    prisma.formation.delete({ where: { id } }),
  ]);

  revalidatePath("/gestion");
}


// Update etudiant

export async function updateEtudiant(formData: FormData) {
  const id = Number(formData.get("id"));
  const nom = String(formData.get("nomEtudiant") ?? "").trim();

  const formationIds = formData
    .getAll("formations")
    .map((fid) => Number(fid))
    .filter((fid) => !Number.isNaN(fid));

  if (!id || !nom) {
    return;
  }

  await prisma.etudiant.update({
    where: { id },
    data: {
      nom,
      // set remplace toutes les inscriptions par la nouvelle selection
      formations: {
        set: formationIds.map((fid) => ({ id: fid })),
      },
    },
  });

  revalidatePath("/gestion");
}


// Delete etudiant

export async function deleteEtudiant(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!id) {
    return;
  }

  // Profil dependant d'abord (FK), puis l'etudiant
  await prisma.$transaction([
    prisma.profil.deleteMany({ where: { etudiantId: id } }),
    prisma.etudiant.delete({ where: { id } }),
  ]);

  revalidatePath("/gestion");
}