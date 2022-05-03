import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, Image, Dimensions, Modal, Pressable, ColorPropType} from "react-native";
import { Button, Box } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Obs, Field} from '../constants/constants';
import FirebaseConn from '../connection/firestore';
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { RadioButton } from "../components/buttons";
import Toast, { BaseToast } from 'react-native-toast-message';
import Colors from '../utils/color'

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

export function Home(props){
  const firebaseConn = FirebaseConn.getInstance();
    // From https://docs.nativebase.io/button
  const isFocused = useIsFocused();
  const { colors } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [activity, setActivity] = useState('cycling');

  const [modalVisible, setModalVisible] = useState(false);

  const PROP = [
    {
      key: "cycling",
      name: "Cycling",
    },
    {
      key: "walking",
      name: "Walking",
    },
    {
      key: "running",
      name: "Running",
    },
    {
      key: "other",
      name: "Other",
    }
  ];

  useEffect(() => {
    const fetchFirebase = async () => {
      const user_data = await firebaseConn.getAll();
      setName(user_data[Field.NAME]);
      setEmail(user_data[Field.EMAIL])
    }
    fetchFirebase().catch(console.error);
  }, [props, isFocused]);

  function radioButtonCallback(value) {
    setActivity(value);
  }

  function showToast(message) {
    console.log(message);
    Toast.show({
      type: "success",
      text1: message,
    })
  }

    return (
    <View style={{height: windowHeight, width: windowWidth, flex: 1, paddingBottom: 10}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View 
            style={styles.modalView}
            backgroundColor={colors.background}
          >
            <View style={{paddingTop: 20}}>
              <RadioButton PROP={PROP} theme={colors} callback={radioButtonCallback} init={activity}/>
            </View>
            <View style={{padding: 20, flex: 1}}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  {
                    backgroundColor: pressed
                    ? colors.buttonActive
                    : colors.buttonInactive
                  }
                ]}
                onPress={() => {
                  firebaseConn.addActivity(activity);
                  setModalVisible(!modalVisible);
                  showToast(PROP.filter(e => e.key === activity)[0].name+" added")
                }}
              >
                <View style={styles.centeredView}>
                  <Text style={styles.maintext}>Save</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
          onPress={() => {
            firebaseConn.addObs(Obs.SYMPTOMS)
            showToast("Symptom added")
          }}
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
            onPress={() => {
              firebaseConn.addObs(Obs.MEDICATION)
              showToast("Medication added")
            }}
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
            onPress={() => {
              setModalVisible(true)
            }}> 
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
      <Toast config={toastConfig}/>
    </View>
  );
}

const toastConfig = {
  success: (props) => (
    <BaseToast
    {...props}
    style={{
      borderLeftColor: Colors.WHITE,
      backgroundColor: Colors.LIGHT_GRAY,
      width: "60%",
      alignContent: "center",
      justifyContent: "center",
      opacity: 0.8
    }}
    contentContainerStyle={{
      alignContent: "center",
      justifyContent: "center",
      opacity: 1
    }}
    text1Style={{
      fontSize: 18,
      color: Colors.WHITE,
      fontWeight: "400",
    }}
    />
  )
}

const BORDER_RADIUS = 6;

const styles = StyleSheet.create({
  // General button design
  button: {
    width: "90%",
    aspectRatio: 350 / 75,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
  },

  // Heading text
  maintext: {
    fontSize: 20,
    color: "white",
  },

  // Button header
  buttonHeader: {
    height: "45%",
    aspectRatio: 240 / 30,
    fontSize: 15,
    left: "5%",
    color: "white",
    fontWeight: "bold",
  },

  // Button describing text
  buttonFooter: {
    height: "45%",
    aspectRatio: 240 / 20,
    fontSize: 15,
    left: "5%",
    color: "white",
  },

  // Small text for email
  emailText: {
    fontSize: 12,
    color: "gray",
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

  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: windowHeight*0.24,
    marginHorizontal: windowWidth*0.05
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 22,
  }
});
