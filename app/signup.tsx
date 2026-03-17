import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Signup() {

  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F9F9F9",
        padding: 20,
        justifyContent: "center"
      }}
    >

      <Text style={{ fontSize: 32, fontWeight: "bold" }}>
        Create Account
      </Text>

      <TextInput
        placeholder="Email"
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 10,
          marginTop: 20
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 10,
          marginTop: 10
        }}
      />

      <TouchableOpacity
        onPress={() => router.replace("/(tabs)")}
        style={{
          backgroundColor: "#000080",
          padding: 18,
          borderRadius: 10,
          marginTop: 20
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Sign Up
        </Text>
      </TouchableOpacity>

    </View>
  );
}