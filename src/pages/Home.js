import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { Button, VStack, Box } from "native-base";

export function Home() {
    // From https://docs.nativebase.io/button
    return (
        <View>
            <View alignItems="center">
                <Text>Report a Symptom</Text>
            </View>
            <View>
                <Box alignItems="center">
                    <Button key={'lg'} size={'lg'} style = {styles.top}>
                        Track Symptom
                    </Button>
                </Box>
            </View>
            <View>
                <Box alignItems="center">
                    <Button key={'lg'} size={'lg'} style = {styles.top}>
                        Track Activity
                    </Button>
                </Box>
            <View>
            </View>
                <Box alignItems="center">
                    <Button key={'lg'} size={'lg'} style = {styles.top}>
                        Track Medication
                    </Button>
                </Box>
            </View>
        </View>
    )
}

const border_radius = 6

const styles = StyleSheet.create({
    top: {
      backgroundColor: "purple",
      borderTopLeftRadius: border_radius,
      borderTopRightRadius: border_radius,
      borderBottomLeftRadius: border_radius,
      borderBottomRightRadius: border_radius,
    }
  });