import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <Image 
          source={require("../assets/images/aviao_lc.png")} 
          style={styles.planeImage} 
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Faça login na{"\n"}sua conta.</Text>
          <Text style={styles.headerSubtitle}>Insira seu email e senha para entrar.</Text>
        </View>
      </View>

      {/* FORM SECTION */}
      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={styles.card}>
            {/* GOOGLE LOGIN */}
            <TouchableOpacity style={styles.googleButton}>
              <MaterialCommunityIcons name="google" size={20} color="#EA4335" />
              <Text style={styles.googleButtonText}>Entrar com Google</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Ou entre por email</Text>
              <View style={styles.divider} />
            </View>

            {/* INPUTS */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                placeholder="thiago.fiap@gmail.com"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.inputWrapper}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.inputLabel}>Senha</Text>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <MaterialCommunityIcons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={18} 
                    color="#64748B" 
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                placeholder="*******"
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
                style={styles.input}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.extraActions}>
              <TouchableOpacity style={styles.checkboxContainer}>
                <View style={styles.checkbox} />
                <Text style={styles.checkboxLabel}>Lembrar-me</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>

            {/* MAIN ACTION */}
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)")}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>

            <View style={styles.signupPrompt}>
              <Text style={styles.signupText}>Não tem uma conta?</Text>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text style={styles.signupLink}> Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1E8A",
  },
  header: {
    minHeight: 250,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  planeImage: {
    width: width * 0.65,
    height: width * 0.40,
    resizeMode: "contain",
    marginTop: 0,
  },
  headerTextContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    lineHeight: 38,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    marginTop: 10,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  card: {
    flex: 1,
    paddingTop: 10,
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  googleButtonText: {
    color: "#1E293B",
    fontWeight: "bold",
    marginLeft: 10,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#F1F5F9",
  },
  dividerText: {
    marginHorizontal: 15,
    color: "#94A3B8",
    fontSize: 12,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "#1E293B",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#0B1E8A",
    paddingVertical: 10,
    fontSize: 16,
    color: "#1E293B",
  },
  extraActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    marginRight: 8,
  },
  checkboxLabel: {
    color: "#94A3B8",
    fontSize: 14,
  },
  forgotPassword: {
    color: "#0B1E8A",
    fontSize: 14,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#0B1E8A",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    paddingBottom: 20,
  },
  signupText: {
    color: "#64748B",
  },
  signupLink: {
    color: "#0B1E8A",
    fontWeight: "bold",
  }
});
