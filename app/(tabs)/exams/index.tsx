import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SIMULADOS } from "../../../constants/simulados";

export default function Exams() {

  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      
      {/* HEADER AZUL ESCURO */}
      <View style={{
        backgroundColor: "#0B1E8A",
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
      }}>
        <Text style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "white"
        }}>
          Simulados
        </Text>
        <Text style={{
          color: "rgba(255,255,255,0.8)",
          marginTop: 5
        }}>
          Treine para sua banca da ANAC
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        
        {SIMULADOS.map(sim => (
          <TouchableOpacity
            key={sim.id}
            onPress={() => router.push(`/exams/${sim.id}` as any)}
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 20,
              marginBottom: 15,
              flexDirection: "row",
              alignItems: "center",
              elevation: 2
            }}
          >
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              backgroundColor: "#E0E7FF",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 15
            }}>
              <MaterialCommunityIcons name={sim.icon as any} size={28} color="#0B1E8A" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1E293B" }}>
                {sim.title}
              </Text>
              <Text style={{ color: "#64748B", marginTop: 2 }}>
                {sim.questionsCount} questões • {sim.durationMinutes} min
              </Text>
            </View>

            <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" />
          </TouchableOpacity>
        ))}

      </ScrollView>

    </View>
  );
}