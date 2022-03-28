import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import { Button, Box} from "native-base";

export function Home() {
    // From https://docs.nativebase.io/button
    return (
        <View>
            <View style = {{top: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../images/anne_nielsen_profile_picture.png')} style={styles.profilePicture} />
            </View>
            <View style = {{top: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.maintext}>Anne Nielsen</Text>
            </View>
            <View style = {{top: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.emailText}>anne_n@gmail.com</Text>
            </View>
            <View style={{top: 140, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.maintext}>REPORT A SYMPTOM</Text>
            </View>
            <View style = {{height:150}}>
            </View>
            <View>
                <Box alignItems="center">
                    <Button key={'lg'} size={'lg'} style = {styles.button}>
                        <Text style={styles.buttonHeader}>
                            Track Symptom
                        </Text>
                        <Text style={styles.buttonFooter}>
                            Overall Asthma Symptoms
                        </Text>
                    </Button>
                </Box>
            </View>
            <View style = {{height:15}}>
            </View>
            <View>
                <Box alignItems="center">
                    <Button key={'lg'} size={'lg'} style = {styles.button}>
                        <Text style={styles.buttonHeader}>
                            Track Medication
                        </Text>
                        <Text style={styles.buttonFooter}>
                            Preventative or Acute Medication
                        </Text>
                    </Button>
                </Box>
            </View>
            <View style = {{height:30}}>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.maintext}>OTHER</Text>
            </View>
            <View style = {{height:10}}>
            </View>
            <View>
                <Box alignItems="center">
                    <Button key={'lg'} size={'lg'} style = {styles.button}>
                        <Text style={styles.buttonHeader}>
                            Track Activity
                        </Text>
                        <Text style={styles.buttonFooter}>
                            Any Symptom-Causing Movement
                        </Text>
                    </Button>
                </Box>
            </View>
        </View>
    )
}

const border_radius = 6

const styles = StyleSheet.create({
    button: {
      backgroundColor: "#383434",
    //   backgroundColor: "purple",
      width: 350,
      height: 75,
      borderTopLeftRadius: border_radius,
      borderTopRightRadius: border_radius,
      borderBottomLeftRadius: border_radius,
      borderBottomRightRadius: border_radius,
    },
    maintext : {
        fontSize: 20,
        font: 'roboto',
        color: "white",
        // fontWeight: "bold",
    },
    buttonHeader : {
        width: 240,
        fontSize: 15,
        left: 20,
        font: 'roboto',
        color: "white",
        fontWeight: "bold",
    },
    buttonFooter : {
        width: 240,
        fontSize: 15,
        left: 20,
        font: 'roboto',
        color: "white",
    },
    emailText : {
        fontSize: 12,
        color: "gray",
        font: "roboto",
    },
    profilePicture : {
        borderRadius: 100,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

  });