import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./src/routes/Navigator";
import { useColorScheme } from "react-native";
import { NativeBaseProvider } from "native-base";
import { Light, Dark } from "./src/styles/style";
import { Login } from "./src/pages/Login";
import { SSRProvider } from "@react-aria/ssr";
import FirebaseConn from "./src/connection/firestore";
import {Field} from 'constants/constants';

export default function App() {

  const firebaseConn = FirebaseConn.getInstance()

  const scheme = useColorScheme();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userExists, setUserExists] = useState(true);

  function loginCallback() {
    setUserExists(false);
  }

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (user != undefined) {
      firebaseConn.createUser(user.uid, user.email);
    }
    setUserExists(true);
  }, [userExists])

  useEffect(() => {
    if (user != undefined) {
      firebaseConn.setUser(user.uid);
      firebaseConn.setEmail(user.email);
    }
  }, [user])

  if (initializing) return null;

  return (
    <SSRProvider>
      <NativeBaseProvider>
        {/* Make the dynamic dark and light mode work again after using:
      <NavigationContainer theme={scheme === 'dark' ? Dark : Light}> */}
        <NavigationContainer theme={Dark}>
          {user ? <TabNavigator/> : <Login parentCallback = {loginCallback}/>}
        </NavigationContainer>
      </NativeBaseProvider>
    </SSRProvider>
  );
}
