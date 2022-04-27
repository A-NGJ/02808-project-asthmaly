import firestore from '@react-native-firebase/firestore';
import {Field, Obs} from '../constants/constants';

class FirebaseConn {
  USERS = "Users";
  static _firebaseConn = null;

  static getInstance() {
    if (FirebaseConn._firebaseConn == null) {
      FirebaseConn._firebaseConn = new FirebaseConn();
    }
    return this._firebaseConn;
  }

  constructor() {
    this.state = {
      user: {
        key: "",
        email: "",
        name: "",
        phone: "",
        symptoms: [],
        activities: [],
        medication: [],
      },
    };
  }

  createUser(key, email) {
    firestore()
      .collection(this.USERS)
      .doc(key)
      .set({
        email: email,
        name: "",
        phone: "",
        symptoms: [],
        activities: [],
        medications: [],
      });
    this.state.user.key = key;
    this.state.user.email = email;
  }

  set(key, value) {
    this.state.user[key] = value;
  }

  setUser(uid) {
    this.set(Field.KEY, uid);
  }

  setEmail(email) {
    this.set(Field.EMAIL, email);
  }

  update(key, value) {
    firestore()
      .collection(this.USERS)
      .doc(this.state.user.key)
      .update({
        [key]: value,
      });
  }

  addObs(type) {
    const dateTime = Date.parse(new Date());
    this.update(type, firestore.FieldValue.arrayUnion(dateTime));
  }

  addActivity(type) {
    const dateTime = Date.parse(new Date());
    this.update(Obs.ACTIVITY, firestore.FieldValue.arrayUnion({timestamp: dateTime, type: type}))
  }

  async get(key) {
    await firestore()
    .collection(this.USERS)
    .doc(this.state.user.key)
    .get()
    .then(documentSnapshot => {
      this.state.user[key] = documentSnapshot.data()[key]
    })
    .catch(error => {
      if (error instanceof TypeError) {
        return null;
      }
      throw error;
    })
  }

  async getName() {
    await this.get(Field.NAME);
    return this.state.user.name;
  }

  async getEmail() {
    await this.get(Field.EMAIL);
    return this.state.user.email;
  }

  async getPhone() {
    await this.get(Field.PHONE);
    return this.state.user.phone;
  }

  async getSymptoms() {
    await this.get(Obs.SYMPTOMS);
    const symptoms = [];
    this.state.user.symptoms.forEach(element => symptoms.push(element));
    return symptoms;
  }

  async getMedication() {
    await this.get(Obs.MEDICATION);
    const medication = [];
    this.state.user.medication.forEach(element => medication.push(element));
    return medication;
  }

  async getActivity() {
    await this.get(Obs.ACTIVITY);
    const activities = [];
    this.state.user.activities.forEach(element => activities.push(element));
    return activities;
  }
}

export default FirebaseConn;
