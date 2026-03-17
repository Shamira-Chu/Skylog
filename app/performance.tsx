import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const { width } = Dimensions.get("window");

export default function PerformanceScreen() {
  const { xp, level, stars } = useAuth();

  const STATS = [
    { label: "Média Acertos", value: "84%", color: "#10B981", icon: "bullseye-arrow" },
    { label: "Horas Estudo", value: "112h", color: "#3B82F6", icon: "timer-outline" },
    { label: "Simulados", value: "27", color: "#F59E0B", icon: "file-certificate-outline" },
    { label: "Classificação", value: "#12", color: "#8B5CF6", icon: "trophy-outline" },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: "Meu Desempenho",
        headerStyle: { backgroundColor: "#0B1E8A" },
        headerTintColor: "#fff"
      }} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* CABEÇALHO DE STATUS */}
        <View style={styles.statsOverview}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{stars}</Text>
            <Text style={styles.statLabel}>Estrelas</Text>
          </View>
          <View style={[styles.statBox, styles.statBoxCenter]}>
            <Text style={[styles.statVal, { fontSize: 32 }]}>LV {level}</Text>
            <Text style={styles.statLabel}>Nível de Piloto</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{xp}</Text>
            <Text style={styles.statLabel}>XP Total</Text>
          </View>
        </View>

        {/* CARDS DE PERFORMANCE */}
        <Text style={styles.sectionTitle}>Estatísticas de Voo</Text>
        <View style={styles.grid}>
          {STATS.map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.iconCirc, { backgroundColor: stat.color + "20" }]}>
                <MaterialCommunityIcons name={stat.icon as any} size={24} color={stat.color} />
              </View>
              <Text style={styles.cardVal}>{stat.value}</Text>
              <Text style={styles.cardLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* GRÁFICO PLACEHOLDER */}
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartTitle}>Evolução Semanal</Text>
          <View style={styles.barContainer}>
            {[40, 60, 45, 80, 75, 90, 85].map((h, i) => (
              <View key={i} style={styles.barItem}>
                <View style={[styles.bar, { height: h }]} />
                <Text style={styles.dayInitial}>{["S", "T", "Q", "Q", "S", "S", "D"][i]}</Text>
              </View>
            ))}
          </View>
        </View>
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
  statsOverview: {
    flexDirection: "row",
    backgroundColor: "#0B1E8A",
    borderRadius: 20,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  statBox: {
    alignItems: "center",
  },
  statBoxCenter: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 15,
  },
  statVal: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#fff",
    width: "48%",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
  },
  iconCirc: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cardVal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
  },
  cardLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  chartPlaceholder: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 20,
  },
  barContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
  },
  barItem: {
    alignItems: "center",
  },
  bar: {
    width: 12,
    backgroundColor: "#0B1E8A",
    borderRadius: 6,
  },
  dayInitial: {
    fontSize: 10,
    color: "#94A3B8",
    marginTop: 8,
  }
});
