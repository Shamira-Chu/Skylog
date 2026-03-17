import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PLANS = [
  {
    id: "free",
    title: "Plano Essencial",
    price: "Grátis",
    tagline: "Para quem está começando a decolar.",
    color: "#64748B",
    bgColor: "#F1F5F9",
    features: [
      { text: "Acesso às matérias base", included: true },
      { text: "20 questões por simulado", included: true },
      { text: "Modo Offline", included: false },
      { text: "Banco de questões VIP", included: false },
      { text: "Cronograma por IA", included: false },
    ]
  },
  {
    id: "pro",
    title: "Plano Performance",
    price: "R$ 29,90",
    period: "/mês",
    tagline: "O preparo ideal para a banca da ANAC.",
    color: "#0B1E8A",
    bgColor: "#EEF2FF",
    popular: true,
    features: [
      { text: "Matérias base ilimitadas", included: true },
      { text: "Banca ANAC completa", included: true },
      { text: "Modo Offline", included: true },
      { text: "Análise de desempenho", included: true },
      { text: "Cronograma por IA", included: false },
    ]
  },
  {
    id: "premium",
    title: "Plano Elite VIP",
    price: "R$ 49,90",
    period: "/mês",
    tagline: "A jornada completa para o piloto comercial.",
    color: "#B45309",
    bgColor: "#FFFBEB",
    features: [
      { text: "Tudo do Plano Pro", included: true },
      { text: "Banco de questões VIP OACI", included: true },
      { text: "Cronograma Dinâmico por IA", included: true },
      { text: "Suporte com Instrutor", included: true },
      { text: "Mentorias ao vivo", included: true },
    ]
  }
];

export default function Plans() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: "Nossos Planos",
        headerShown: true,
        headerStyle: { backgroundColor: "#0B1E8A" },
        headerTintColor: "#fff"
      }} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Escolha sua Jornada</Text>
        <Text style={styles.headerSubtitle}>Temos o plano ideal para cada estágio da sua carreira na aviação.</Text>

        {PLANS.map((plan) => (
          <View key={plan.id} style={[styles.planCard, { borderColor: plan.color }]}>
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>MAIS POPULAR</Text>
              </View>
            )}

            <View style={[styles.planHeader, { backgroundColor: plan.bgColor }]}>
              <Text style={[styles.planTitle, { color: plan.color }]}>{plan.title.toUpperCase()}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{plan.price}</Text>
                {plan.period && <Text style={styles.period}>{plan.period}</Text>}
              </View>
              <Text style={styles.planTagline}>{plan.tagline}</Text>
            </View>

            <View style={styles.featuresContainer}>
              {plan.features.map((feature, idx) => (
                <View key={idx} style={styles.featureRow}>
                  <MaterialCommunityIcons 
                    name={feature.included ? "check-circle" : "close-circle-outline"} 
                    size={20} 
                    color={feature.included ? "#10B981" : "#CBD5E1"} 
                  />
                  <Text style={[styles.featureText, !feature.included && styles.featureDisabled]}>
                    {feature.text}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity 
              style={[styles.subscribeButton, { backgroundColor: plan.color }]}
              onPress={() => router.replace("/(tabs)/profile")}
            >
              <Text style={styles.subscribeText}>
                {plan.id === "free" ? "Continuar Grátis" : "Começar Agora"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text style={styles.footerText}>
          Cancele sua assinatura a qualquer momento através da loja de aplicativos.
        </Text>
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
    padding: 25,
    paddingBottom: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
    lineHeight: 22,
  },
  planCard: {
    backgroundColor: "white",
    borderRadius: 25,
    marginBottom: 25,
    overflow: "hidden",
    borderWidth: 1,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  popularBadge: {
    position: "absolute",
    top: 15,
    right: -30,
    backgroundColor: "#2F6BFF",
    paddingVertical: 5,
    paddingHorizontal: 40,
    transform: [{ rotate: "45deg" }],
    zIndex: 1,
  },
  popularText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  planHeader: {
    padding: 25,
    alignItems: "center",
  },
  planTitle: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E293B",
  },
  period: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 5,
    marginLeft: 2,
  },
  planTagline: {
    fontSize: 13,
    color: "#475569",
    textAlign: "center",
    fontStyle: "italic",
  },
  featuresContainer: {
    padding: 25,
    backgroundColor: "white",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  featureText: {
    fontSize: 15,
    color: "#334155",
    marginLeft: 12,
  },
  featureDisabled: {
    color: "#94A3B8",
    textDecorationLine: "line-through",
  },
  subscribeButton: {
    margin: 25,
    marginTop: 0,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  subscribeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 10,
    lineHeight: 18,
  }
});
