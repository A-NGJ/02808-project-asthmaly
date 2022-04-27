import React, {useEffect, useState} from 'react';
import FirebaseConn from '../connection/firestore';
import {useIsFocused} from '@react-navigation/native';
import {GetDateHours} from './PlotHours';
import {GetDateDays} from './PlotDays';
import {Obs} from '../constants/constants';

export function getData(dataType) {
  const firebaseConn = FirebaseConn.getInstance();
  const [symptoms, setSymptoms] = useState([]);
  const [medication, setMedication] = useState([]);
  const [activity, setActivity] = useState([]);
  const isFocused = useIsFocused();
  let dateTimes;

  useEffect(() => {
    const fetchFirebase = async () => {
      const symptoms = await firebaseConn.getSymptoms();
      setSymptoms(symptoms);

      const medication = await firebaseConn.getMedication();
      setMedication(medication);

      const activity = await firebaseConn.getActivity();
      setActivity(activity);
    };
    return () => fetchFirebase();
  }, [isFocused]);

  switch (dataType) {
    case Obs.SYMPTOMS:
      dateTimes = symptoms.map(x => new Date(x));
      break;
    case Obs.MEDICATION:
      dateTimes = medication.map(x => new Date(x));
      break;
    case Obs.ACTIVITY:
      dateTimes = activity.map(x => new Date(x));
      break;
    default:
      console.log('Choose data type to get!');
  }

  const dateTimeByDay = GetDateDays(dateTimes);
  const dateTimeByHours = GetDateHours(dateTimes);

  return {
    dateTimeByDay,
    dateTimeByHours,
  };
}
