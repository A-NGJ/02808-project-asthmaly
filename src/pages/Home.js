import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { Button, Box } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Obs} from '../constants/constants';
import FirebaseConn from '../connection/firestore';
import { useIsFocused } from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


Home.navigationOptions = ({ navigation }) => ({
  tabBarLabel: "Home",
  tabBarIcon: ({ color, size }) => (
    <Icon
      name="home-outline"
      color={color}
      size={size} />
  ),
  headerRight: () => (
    <Icon
      name="dots-vertical"
      color={"#ffff"}
      size={25}
      onPress={() => navigation.navigate("Settings")}
    />
  ),
});

export function Home(){
  const firebaseConn = new FirebaseConn();
    // From https://docs.nativebase.io/button
  const isFocused = useIsFocused();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [symptoms, setSymptoms] = useState('');
  useEffect(() => {
    const fetchFirebase = async () => {
      const name = await firebaseConn.getName();
      const email = await firebaseConn.getEmail();
      const symptoms = await firebaseConn.getSymptoms();
      setSymptoms(symptoms);
      setName(name);
      setEmail(email)
    }
    fetchFirebase();
  }, [isFocused])

    return (
    <View style={{height: windowHeight, width: windowWidth, margin: 5, flex: 1}}>
      {/* Profile info */}
      <View style = {{top: '5%', justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../images/anne_nielsen_profile_picture.png')} style={styles.profilePicture} />
      </View>
      <View style = {{top: '5%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.maintext}>{name}</Text>
      </View>
      <View style = {{top: '5%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.emailText}>{email}</Text>
    </View>

    {/* Buttons and text fields */}
    <View style={{ top: "21%", justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.maintext}>REPORT A SYMPTOM</Text>
    </View>
    <View style={{ marginTop: "38%" }}>
    </View>


    {/* Track a symptom button */}
    <View style={{flex: 1}}>
    <View>
        <Box alignItems="center">
            <Button
              key={'lg'} bg="#383434" size={'lg'}
              style = {styles.button} _pressed={{bg: "gray.800"}}
              onPress={() => firebaseConn.addObs(Obs.SYMPTOMS)}
            >
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <View style={{margin: 0}}>
                        <Image source={require('../images/symptom_icon.png')} style={styles.iconImage}/>
                    </View>
                    <View>
                        <Text style={styles.buttonHeader}>
                            Track Symptom
                        </Text>
                        <Text style={styles.buttonFooter}>
                            Overall Asthma Symptoms
                        </Text>
                    </View>
                </View>
            </Button>
        </Box>
    </View>
    <View style = {{marginTop: '5%'}}>
    </View>

    {/* Track medication button */}
    <View>
        <Box alignItems="center">
            <Button key={'lg'} bg="#383434" size={'lg'}
              style = {styles.button} _pressed={{bg: "gray.800"}}
              onPress={() => firebaseConn.addObs(Obs.MEDICATION)}
            >
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <View style={{margin: 0}}>
                        <Image source={require('../images/medication_icon.png')} style={styles.iconImage}/>
                    </View>
                    <View>
                    <Text style={styles.buttonHeader}>
                        Track Medication
                    </Text>
                    <Text style={styles.buttonFooter}>
                        Preventative or Acute Medication
                    </Text>
                    </View>
                </View>
            </Button>
        </Box>
    </View>
    </View>
    {/* <View style = {{marginTop: '8%'}}>
    </View> */}

      {/* Track activity button */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.maintext}>OTHER</Text>
      </View>
      <View style={{ marginTop: "2%" }}>
      </View>
      <View>
        <Box alignItems="center">
          <Button
            key={"lg"}
            bg="#383434"
            size={"lg"}
            style={styles.button}
            _pressed={{ bg: "gray.800" }}
            onPress={() => firebaseConn.addObs(Obs.ACTIVITY)}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <View style={{ margin: 0 }}>
                <Image source={require("../images/exercise_icon.png")} style={styles.iconImage} />
              </View>
              <View>
                <Text style={styles.buttonHeader}>
                  Track Activity
                </Text>
                <Text style={styles.buttonFooter}>
                  Any Symptom-Causing Movement
                </Text>
              </View>
            </View>
          </Button>
        </Box>
      </View>
    </View>
  );
}

const border_radius = 6;

const styles = StyleSheet.create({
  // General button design
  button: {
    //   backgroundColor: "#383434",
    // width: 350,
    width: "90%",
    aspectRatio: 350 / 75,
    borderTopLeftRadius: border_radius,
    borderTopRightRadius: border_radius,
    borderBottomLeftRadius: border_radius,
    borderBottomRightRadius: border_radius,
  },

  // Heading text
  maintext: {
    fontSize: 20,
    font: "roboto",
    color: "white",
    // fontWeight: "bold",
  },

  // Button header
  buttonHeader: {
    height: "45%",
    aspectRatio: 240 / 30,
    fontSize: 15,
    left: "5%",
    font: "roboto",
    color: "white",
    fontWeight: "bold",
  },

  // Button describing text
  buttonFooter: {
    height: "45%",
    aspectRatio: 240 / 20,
    fontSize: 15,
    left: "5%",
    font: "roboto",
    color: "white",
  },

  // Small text for email
  emailText: {
    fontSize: 12,
    color: "gray",
    font: "roboto",
  },

  // Add profile picture
  profilePicture: {
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  // Image sizing info
  iconImage: {
    flex: 1,
    resizeMode: "contain",
    left: 0,
  },

});
