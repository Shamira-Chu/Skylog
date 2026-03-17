import { View, Text } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Splash() {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/onboarding");
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000080",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 28 }}>
        SkyLog
      </Text>
    </View>
  );
}