import firestore from "@react-native-firebase/firestore"

class FirebaseConn {
  USERS = "Users";

  state = undefined

  constructor() {
    this.state = {
      user: {
        key: "MlxTXSR7H4Q7V1pTxIwy"
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


}

export default FirebaseConn;
