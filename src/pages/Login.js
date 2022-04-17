import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Box, Button, Center, FormControl, Heading, Input, Link, VStack, Icon } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function Login() {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../images/login_img.png")} style={styles.image} />
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
            <View style={styles.headerContainer}>
              <Heading
                size="lg"
                fontWeight="600"
                color="#ffff">
                Login
              </Heading>
            </View>
            <VStack
              space={3}
              mt="5">
              <FormControl>
                <Input
                  size="md"
                  h="50px"
                  placeholder="E-mail"
                  InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}
                  style={styles.input} />
              </FormControl>
              <FormControl>
                <Input
                  size="md"
                  h="50px"
                  placeholder="Password"
                  type={show ? "text" : "password"}
                  InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />}
                  InputRightElement={<Icon as={<MaterialIcons name={show ? "eye" : "eye-off"} />} size={5}
                                           mr="2" color="muted.400" onPress={() => setShow(!show)} />}
                  style={styles.input} />
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "#ffff",
                  }} alignSelf="flex-end" mt="1">
                  Forgot Password?
                </Link>
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
    marginTop: -150,
  },
  image: {
    borderRadius: 100,
    width: 179,
    height: 187,
    resizeMode: "contain",
  },
  formContainer: {
    flex: 1,
    marginTop: -250,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  input: {
    borderColor: "red",
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 100,
    width: 203.41,
    height: 49.21,
    backgroundColor: "#262626",
  },
});
