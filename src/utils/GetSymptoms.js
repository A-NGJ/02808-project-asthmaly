import React, {useEffect, useState} from 'react';
import FirebaseConn from '../connection/firestore';
import {useIsFocused} from '@react-navigation/native';
import {GetDateHours} from './PlotHours';
import {GetDateDays} from './PlotDays';

export function getSymptoms() {
  const firebaseConn = new FirebaseConn();
  const [timestamps, setTimestamps] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchFirebase = async () => {
      const symptoms = await firebaseConn.getSymptoms();
      setTimestamps(symptoms);
    };
    return () => fetchFirebase();
  }, [isFocused]);

  const dateTimes = timestamps.map(x => new Date(x));

  const dateTimeByDay = GetDateDays(dateTimes);
  const dateTimeByHours = GetDateHours(dateTimes);

  return {
    dateTimeByDay,
    dateTimeByHours,
  };
}
