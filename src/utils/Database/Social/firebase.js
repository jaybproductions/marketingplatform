import firebase from "../../../firebase";
export async function GetSocialPostsFromFirebase(userId) {
  let tempArr = [];

  const eventsRef = await firebase.db
    .collection("socialposts")
    .where("userid", "==", `${userId}`)
    .get();
  eventsRef.forEach((doc) => {
    tempArr.push(doc.data());
  });

  tempArr.forEach((event) => {
    event.start = new Date(event.start);
    if (event.end == null) {
      event.end = new Date(event.start);
    } else {
      event.end = new Date(event.end);
    }
  });

  return tempArr;
}
