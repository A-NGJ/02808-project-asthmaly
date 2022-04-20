import firestore from '@react-native-firebase/firestore';
import {Field, Obs} from '../constants/constants';

class FirebaseConn {
  USERS = 'Users';

  constructor() {
    this.state = {
      user: {
        key: 'MlxTXSR7H4Q7V1pTxIwy',
        name: '',
        phone: '',
        symptoms: [],
        activities: [],
        medication: [],
      },
    };
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

  async get(key) {
    await firestore()
      .collection(this.USERS)
      .doc(this.state.user.key)
      .get()
      .then(documentSnapshot => {
        this.state.user[key] = documentSnapshot.data()[key];
      });
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
    this.state.user.medication.forEach(element =>
      symptoms.push(
        Date(element['seconds'] * 1000 + symptoms['nanoseconds'] / 1000000),
      ),
    );
    return medication;
  }

  async getActivity() {
    await this.get(Obs.ACTIVITY);
    const activities = [];
    this.state.user.activities.forEach(element =>
      symptoms.push(
        Date(element['seconds'] * 1000 + symptoms['nanoseconds'] / 1000000),
      ),
    );
    return activities;
  }
}

export default FirebaseConn;
