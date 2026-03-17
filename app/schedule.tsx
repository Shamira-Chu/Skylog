import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Stack, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const SCHEDULE_DAYS = [
  { day: "Segunda", subjects: [{ time: "19:00", name: "Meteorologia", icon: "weather-cloudy" }, { time: "21:00", name: "Simulado Geral", icon: "clipboard-text" }] },
  { day: "Terça", subjects: [{ time: "19:00", name: "Navegação Aérea", icon: "compass-outline" }, { time: "20:30", name: "RBAC 61", icon: "book-outline" }] },
  { day: "Quarta", subjects: [{ time: "20:00", name: "Conhecimentos Tec.", icon: "engine-outline" }] },
  { day: "Quinta", subjects: [{ time: "19:00", name: "Regulamentos", icon: "gavel" }, { time: "21:00", name: "Simulado Materiais", icon: "clipboard-check" }] },
  { day: "Sexta", subjects: [{ time: "18:30", name: "Teoria de Voo", icon: "airplane-takeoff" }] },
];

export default function ScheduleScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: "Meu Cronograma",
        headerStyle: { backgroundColor: "#0B1E8A" },
        headerTintColor: "#fff"
      }} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Plano de Voo de Estudos</Text>
          <Text style={styles.subtitle}>Sua jornada semanal para a aprovação</Text>
        </View>

        {SCHEDULE_DAYS.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayText}>{day.day}</Text>
            </View>
            
            {day.subjects.map((sub, sIdx) => (
              <View key={sIdx} style={styles.subjectCard}>
                <View style={[styles.iconContainer, { backgroundColor: "#EEF2FF" }]}>
                  <MaterialCommunityIcons name={sub.icon as any} size={24} color="#0B1E8A" />
                </View>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectName}>{sub.name}</Text>
                  <View style={styles.timeRow}>
                    <MaterialCommunityIcons name="clock-outline" size={14} color="#64748B" />
                    <Text style={styles.timeText}>{sub.time}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.actionBtn}>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 20,
  },
  headerInfo: {
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayHeader: {
    marginBottom: 10,
    paddingLeft: 5,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0B1E8A",
  },
  subjectCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  subjectInfo: {
    flex: 1,
    marginLeft: 15,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  timeText: {
    fontSize: 12,
    color: "#64748B",
    marginLeft: 4,
  },
  actionBtn: {
    padding: 5,
  }
});
