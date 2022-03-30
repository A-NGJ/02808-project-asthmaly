import * as React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {Button, Box} from "native-base";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function Home() {
    // From https://docs.nativebase.io/button
    return (
        <View style={{height: windowHeight, width: windowWidth}}>
            {/* Profile info */}
            <View style = {{top: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../images/anne_nielsen_profile_picture.png')} style={styles.profilePicture} />
            </View>
            <View style = {{top: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.maintext}>Anne Nielsen</Text>
            </View>
            <View style = {{top: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.emailText}>anne_n@gmail.com</Text>
            </View>

            {/* Buttons and text fields */}
            <View style={{top: 140, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.maintext}>REPORT A SYMPTOM</Text>
            </View>
            <View style = {{height:150}}>
            </View>

            {/* Track a symptom button */}
            <View>
                <Box alignItems="center">
                    <Button key={'lg'} bg="#383434" size={'lg'} style = {styles.button} _pressed={{bg: "gray.800"}}>
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
            <View style = {{height:15}}>
            </View>

            {/* Track medication button */}
            <View>
                <Box alignItems="center">
                    <Button key={'lg'} bg="#383434" size={'lg'} style = {styles.button} _pressed={{bg: "gray.800"}}>
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
            <View style = {{height:30}}>
            </View>

            {/* Track activity button */}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.maintext}>OTHER</Text>
            </View>
            <View style = {{height:10}}>
            </View>
            <View>
                <Box alignItems="center">
                    <Button key={'lg'} bg="#383434" size={'lg'} style = {styles.button} _pressed={{bg: "gray.800"}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{margin: 0}}>
                                <Image source={require('../images/exercise_icon.png')} style={styles.iconImage}/>
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
    )
}

const border_radius = 6

const styles = StyleSheet.create({
    // General button design
    button: {
    //   backgroundColor: "#383434",
      width: 350,
      height: 75,
      borderTopLeftRadius: border_radius,
      borderTopRightRadius: border_radius,
      borderBottomLeftRadius: border_radius,
      borderBottomRightRadius: border_radius,
    },

    // Heading text
    maintext : {
        fontSize: 20,
        font: 'roboto',
        color: "white",
        // fontWeight: "bold",
    },

    // Button header
    buttonHeader : {
        width: 240,
        fontSize: 15,
        left: -18,
        font: 'roboto',
        color: "white",
        fontWeight: "bold",
    },

    // Button describing text
    buttonFooter : {
        width: 240,
        fontSize: 15,
        left: -18,
        font: 'roboto',
        color: "white",
    },

    // Small text for email
    emailText : {
        fontSize: 12,
        color: "gray",
        font: "roboto",
    },

    // Add profile picture
    profilePicture : {
        borderRadius: 100,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Image sizing info
    iconImage : {
        flex: 1,
        resizeMode: 'contain',
        left: -18,
    },

  });