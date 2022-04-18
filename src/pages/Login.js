import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Switch } from "react-native";
import { Box, Button, Center, FormControl, Heading, Input, Link, VStack, Icon, HStack } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function Login() {
  const [show, setShow] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../images/login_img.png")} style={styles.image} />
      </View>
      <View style={styles.headerContainer}>
        <Heading
          size="lg"
          fontWeight="600"
          color="#ffff">
          Login
        </Heading>
      </View>
      <View style={styles.formContainer}>
        <Center
          w="100%">
          <Box
            safeArea
            p="2"
            py="8"
            w="90%"
            maxW="290">
            <VStack
              space={3}
              mt="5">
              <FormControl>
                <Input
                  size="md"
                  h="50px"
                  color="#ffff" fkgjfkgj
                  placeholder="E-mail"
                  InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}
                  style={styles.input} />
              </FormControl>
              <FormControl>
                <Input
                  size="md"
                  h="50px"
                  color="#ffff"
                  placeholder="Password"
                  type={show ? "text" : "password"}
                  InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />}
                  InputRightElement={<Icon as={<MaterialIcons name={show ? "eye" : "eye-off"} />} size={5}
                                           mr="2" color="muted.400" onPress={() => setShow(!show)} />}
                  style={styles.input} />
                <View style={{ marginTop: 2 }}>
                  <HStack alignItems="flex-start">
                    <Switch
                      style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }] }}
                      trackColor={{ false: "#ffff", true: "#ffff" }}
                      thumbColor={isEnabled ? "#262626" : "#262626"}
                      ios_backgroundColor="#ffff"
                      onValueChange={toggleSwitch}
                      value={isEnabled} />
                    <Text style={styles.rememberMeText}>Remember me</Text>
                  </HStack>
                  <Link
                    _text={{
                      fontSize: "xs",
                      fontWeight: "500",
                      color: "#ffff",
                    }} alignSelf="flex-end" mt="-6">
                    Forgot Password?
                  </Link>
                </View>
              </FormControl>
              <View style={styles.buttonContainer}>
                <Button
                  mt="2"
                  colorScheme="indigo"
                  style={styles.button}>
                  Login
                </Button>
              </View>
            </VStack>
          </Box>
        </Center>
      </View>
      <View style={styles.orTextContainer}>
        <Text style={styles.OrText}>OR</Text>
        <Text style={styles.OrText}>Log in with</Text>
      </View>
      <View style={styles.outerLoginOptionsContainer}>
        <View style={styles.loginOptionsContainer}>
          <View style={styles.circle}>
            <Image source={require("../images/google.png")} style={styles.logoImage} />
          </View>
          <View style={styles.circle}>
            <Image source={require("../images/apple.png")} style={styles.logoImage} />
          </View>
          <View style={styles.circle}>
            <Image source={require("../images/facebook.png")} style={styles.logoImage} />
          </View>
        </View>
        <Text style={styles.registerNowText}>Don't have an account? Register now</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  image: {
    borderRadius: 100,
    width: 179,
    height: 187,
    resizeMode: "contain",
  },
  formContainer: {
    flex: 1,
    marginTop: -20,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  input: {
    borderColor: "red",
  },
  rememberMeText: {
    marginTop: 4,
    fontSize: 13,
    color: "#ffff",
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 100,
    width: 203.41,
    height: 49.21,
    backgroundColor: "#262626",
  },
  orTextContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  OrText: {
    fontSize: 14,
    color: "#ffff",
  },
  outerLoginOptionsContainer: {
    flex: 0.5,
    alignItems: "center",
  },
  loginOptionsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 1000,
    backgroundColor: "#262626",
  },
  logoImage: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    marginLeft: 7,
    marginTop: 7,
  },
  registerNowText: {
    fontSize: 12,
    marginTop: 15,
    color: "#ffff",
  },
});
