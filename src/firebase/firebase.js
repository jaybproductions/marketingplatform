import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    //initializing firebase app for frontend changes
    app.initializeApp(firebaseConfig);
    this.app = app;
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  //Signup/register for new account function
  async register(name, email, password, photoURL) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return newUser.user.updateProfile({
      displayName: name,
      photoURL: photoURL,
    });
  }

  //Login function
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  //Logout function
  logout(email, password) {
    return this.auth.signOut();
  }
  //Reset password function
  resetPassword(email) {
    return this.auth.sendPasswordResetEmail(email);
  }
}

//initialize and export
const firebase = new Firebase();
export default firebase;
