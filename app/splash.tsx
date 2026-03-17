import { View, Animated, StyleSheet, Dimensions } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter, Stack } from "expo-router";

const { width } = Dimensions.get("window");

export default function Splash() {
  const router = useRouter();
  
  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Sequência de animação
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      })
    ]).start();

    // Navegação mais rápida após 2 segundos
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <Animated.Image
        source={require("../assets/images/logo_skylog.png")}
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      />
      
      <Animated.Text style={[
        styles.appName,
        {
          opacity: fadeAnim,
          transform: [{ translateY: Animated.multiply(fadeAnim, -10) }]
        }
      ]}>
        SkyLog
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: "contain",
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000080",
    letterSpacing: 2,
  }
});