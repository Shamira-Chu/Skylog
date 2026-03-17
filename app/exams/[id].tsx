import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SIMULADOS } from "../../constants/simulados";

export default function ExamDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const simulado = SIMULADOS.find(s => s.id === id);

  if (!simulado) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Simulado não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <Stack.Screen 
        options={{ 
          title: "Detalhes",
          headerStyle: { backgroundColor: "#0B1E8A" },
          headerTintColor: "#fff"
        }} 
      />

      <ScrollView contentContainerStyle={{ padding: 25 }}>
        
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            backgroundColor: "#E0E7FF",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20
          }}>
            <MaterialCommunityIcons name={simulado.icon as any} size={45} color="#0B1E8A" />
          </View>

          <Text style={{ fontSize: 26, fontWeight: "bold", color: "#1E293B", textAlign: "center" }}>
            {simulado.title}
          </Text>
        </View>

        <View style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: 20,
          marginTop: 30,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 2
        }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1E293B", marginBottom: 10 }}>
            Sobre o Simulado
          </Text>
          <Text style={{ color: "#64748B", lineHeight: 22, fontSize: 15 }}>
            {simulado.description}
          </Text>

          <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="help-circle-outline" size={24} color="#0B1E8A" />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 13, color: "#94A3B8" }}>Questões</Text>
                <Text style={{ fontWeight: "700", color: "#1E293B" }}>{simulado.questionsCount}</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="clock-outline" size={24} color="#0B1E8A" />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 13, color: "#94A3B8" }}>Duração</Text>
                <Text style={{ fontWeight: "700", color: "#1E293B" }}>{simulado.durationMinutes} min</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={{ fontWeight: "600", color: "#64748B", marginBottom: 10 }}>Dicas para a prova:</Text>
          <Text style={{ color: "#94A3B8", fontSize: 14, marginBottom: 5 }}>• Leia atentamente cada enunciado.</Text>
          <Text style={{ color: "#94A3B8", fontSize: 14, marginBottom: 5 }}>• Gerencie seu tempo sabiamente.</Text>
          <Text style={{ color: "#94A3B8", fontSize: 14 }}>• Tente manter a calma durante as questões mais complexas.</Text>
        </View>

      </ScrollView>

      <View style={{ padding: 25, backgroundColor: "white", borderTopWidth: 1, borderColor: "#E2E8F0" }}>
        <TouchableOpacity
          onPress={() => router.push({ pathname: "/exams/quiz", params: { id: simulado.id } } as any)}
          style={{
            backgroundColor: "#0B1E8A",
            padding: 18,
            borderRadius: 15,
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Iniciar Simulado
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
