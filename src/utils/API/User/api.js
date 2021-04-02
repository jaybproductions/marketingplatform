import firebase from "../../../firebase";
export async function GetUserData(userId) {
  const docRef = await firebase.db.collection("users").doc(userId).get();
  return docRef.data();
}
