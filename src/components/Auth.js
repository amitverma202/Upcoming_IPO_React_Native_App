import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleAuthenticate = () => {
    const dummyUser = { username: "user", password: "password" };

    if (
      (isLogin &&
        username === dummyUser.username &&
        password === dummyUser.password) ||
      (!isLogin && username && password)
    ) {
      onLogin();
      navigation.navigate("Dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          STOCK IPO's DASHBOARD
        </Text>
        <Text style={styles.subtitle}>
          {isLogin ? "Login" : "Sign Up"}
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAuthenticate}
        >
          <Text style={styles.buttonText}>
            {isLogin ? "Login" : "Sign Up"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Text
            style={styles.toggleLink}
            onPress={handleToggle}
          >
            {isLogin ? "Sign up" : "Login"}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2D3748",
  },
  formContainer: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#4A5568",
    backgroundColor: "#2D3748",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#68D391",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "#A0AEC0",
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: "#A0AEC0",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#4A5568",
    paddingLeft: 10,
    color: "#E2E8F0",
  },
  button: {
    backgroundColor: "#48BB78",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#2D3748",
    fontWeight: "bold",
  },
  toggleText: {
    marginTop: 10,
    color: "#A0AEC0",
  },
  toggleLink: {
    color: "#9F7AEA",
    fontWeight: "bold",
  },
});

export default Auth;
