import { useState } from "react";
import firestore from "@react-native-firebase/firestore"

class FirebaseConn {
  USERS = "Users";

  constructor() {
    this.state = {
      user: {
        key: "MlxTXSR7H4Q7V1pTxIwy",
        name: "",
        symptoms: [],
      }
    };

  };

  update(key, value) {
    firestore()
    .collection(this.USERS)
    .doc(this.state.user.key)
    .update({
      [key]: value,
    });
  }
  
  addObs(type) {
    this.update(type, firestore.FieldValue.arrayUnion(new Date()));
  };

  async get(key) {
    await firestore()
    .collection(this.USERS)
    .doc(this.state.user.key)
    .get()
    .then(documentSnapshot => {
      this.state.user[key] = documentSnapshot.data()[key]
    });
  }

  async getName(setter) {
    await this.get("name")
    setter(this.state.user.name)
  }

  async getSymptoms(setter) {
    await this.get("symptoms")
    console.log(this.state.user.symptoms[0])
    const date = new Date(this.state.user.symptoms[0]["seconds"]*1000 + this.state.user.symptoms[0]["nanoseconds"]/1000000)
    console.log(date)
    setter(date.getDate())
  }

}

export default FirebaseConn;
