import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { fakeMenu } from "../fakeData/fakeMenu";

export const getUser = async (idUser) => {
  //const docRef = doc(CHEMIN)
  const docRef = doc(db, "users", idUser);

  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const userReceived = docSnapshot.data();
    return userReceived;
  }
};

// Quand une fonction retourne une promesse, cette promesse ne peut avoir que 3 valeurs possibles :
// 1er cas : promesse en cours d'achèvement => Promise (pending)
// 2e cas : résultat positif de la promesse achevée => résultat positif (fulfilled)
// 3e cas : résultat négatif de la promesse achevée => résultat négatif (rejected)

export const createUser = async (userId) => {
  console.log("🚀 Début de création de l'utilisateur:", userId);

  // CACHETTE
  const docRef = doc(db, "users", userId);
  console.log("📍 Référence du document:", docRef);

  // NOURRITURE
  const newUserToCreate = {
    username: userId,
    menu: fakeMenu.SMALL,
  };
  console.log("📦 Données à sauvegarder:", newUserToCreate);

  try {
    //setDoc(CACHETTE, NOURRITURE)
    await setDoc(docRef, newUserToCreate);
    console.log("✅ Utilisateur créé avec succès dans Firestore!");
    return newUserToCreate;
  } catch (error) {
    console.error("❌ Erreur lors de la création de l'utilisateur:", error);
    throw error;
  }
};

export const authenticateUser = async (userId) => {
  const existingUser = await getUser(userId);

  if (!existingUser) {
    return await createUser(userId);
  }
  return existingUser;
};
