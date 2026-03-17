import { View, Text, TouchableOpacity, Animated, ScrollView } from "react-native";
import { useState, useRef } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { SIMULADOS } from "../../../constants/simulados";
import { useAuth } from "../../../context/AuthContext";

export default function Quiz() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addXp, addStars } = useAuth();
  
  const simuladoData = SIMULADOS.find(s => s.id === id);
  const questions = (simuladoData?.questions && simuladoData.questions.length > 0) 
    ? simuladoData.questions 
    : [
        {
          question: "Nenhuma questão encontrada para este simulado.",
          options: ["Voltar"],
          answer: 0,
          explanation: "Infelizmente este banco de dados ainda está vazio."
        }
      ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const xpAnim = useRef(new Animated.Value(0)).current;
  const xpOpacity = useRef(new Animated.Value(0)).current;

  const question = questions[current];
  const progress = (current + 1) / questions.length;

  function showXP() {
    addXp(10);
    xpAnim.setValue(0);
    xpOpacity.setValue(1);

    Animated.parallel([
      Animated.timing(xpAnim, {
        toValue: -40,
        duration: 700,
        useNativeDriver: true
      }),
      Animated.timing(xpOpacity, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true
      })
    ]).start();
  }

  function selectOption(index: number) {
    if (selected !== null) return;
    setSelected(index);
    if (index === question.answer) {
      setScore(score + 1);
      showXP();
    }
  }

  function nextQuestion() {
    if (current >= questions.length - 1) {
      addXp(100);
      addStars(score * 10);
      setFinished(true);
      return;
    }

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      setSelected(null);
      setCurrent(current + 1);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();
    });
  }

  if (finished) {
    const earnedStars = score * 10;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC", padding: 20 }}>
        <Stack.Screen options={{ title: "Resultado Final" }} />
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#0B1E8A" }}>
          Parabéns!
        </Text>
        <Text style={{ fontSize: 18, color: "#64748B", marginTop: 10 }}>
          Você concluiu o simulado
        </Text>
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <Text style={{ fontSize: 60 }}>🏆</Text>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
            {score}/{questions.length} ACERTOS
          </Text>
          <Text style={{ fontSize: 22, color: "#FBBF24", marginTop: 10, fontWeight: "bold" }}>
            ⭐ {earnedStars} estrelas ganhas
          </Text>
          <Text style={{ fontSize: 18, color: "#22C55E", marginTop: 5, fontWeight: "bold" }}>
            +100 XP de Bônus!
          </Text>
        </View>
        
        <TouchableOpacity 
          onPress={() => router.replace("/(tabs)/exams")}
          style={{ backgroundColor: "#0B1E8A", padding: 18, borderRadius: 15, width: "100%", marginTop: 60, alignItems: "center" }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Voltar para Simulados</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <Stack.Screen 
        options={{ 
          title: simuladoData?.title || "Simulado",
          headerStyle: { backgroundColor: "#0B1E8A" },
          headerTintColor: "#fff"
        }} 
      />

      <ScrollView contentContainerStyle={{ padding: 25, paddingTop: 40 }}>
        <View style={{ height: 10, backgroundColor: "#E2E8F0", borderRadius: 10, marginBottom: 30 }}>
          <View style={{ height: 10, width: `${progress * 100}%`, backgroundColor: "#2F6BFF", borderRadius: 10 }} />
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={{ color: "#64748B", fontWeight: "600", marginBottom: 10 }}>
            Questão {current + 1} de {questions.length}
          </Text>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1E293B", marginBottom: 30 }}>
            {question.question}
          </Text>

          {question.options.map((opt, i) => {
            let bg = "#fff";
            let borderColor = "#E2E8F0";
            if (selected !== null) {
              if (i === question.answer) { bg = "#DCFCE7"; borderColor = "#22C55E"; }
              else if (i === selected) { bg = "#FEE2E2"; borderColor = "#EF4444"; }
            }
            return (
              <TouchableOpacity key={i} onPress={() => selectOption(i)} style={{ backgroundColor: bg, padding: 20, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor }}>
                <Text style={{ fontSize: 16, color: "#1E293B", fontWeight: "500" }}>{opt}</Text>
              </TouchableOpacity>
            )
          })}
        </Animated.View>

        {selected !== null && (
          <View style={{ backgroundColor: "#EFF6FF", padding: 20, borderRadius: 15, marginTop: 10, borderLeftWidth: 5, borderLeftColor: "#2F6BFF" }}>
            <Text style={{ fontWeight: "bold", color: "#1E40AF", marginBottom: 5 }}>💡 Explicação:</Text>
            <Text style={{ color: "#1E3A8A", lineHeight: 20 }}>{question.explanation}</Text>
          </View>
        )}
      </ScrollView>

      <Animated.Text style={{ position: "absolute", top: 150, alignSelf: "center", fontSize: 32, fontWeight: "bold", color: "#22C55E", opacity: xpOpacity, transform: [{ translateY: xpAnim }] }}>
        +10 XP
      </Animated.Text>

      <View style={{ padding: 25, backgroundColor: "white", borderTopWidth: 1, borderColor: "#E2E8F0" }}>
        {selected !== null ? (
          <TouchableOpacity onPress={nextQuestion} style={{ backgroundColor: "#0B1E8A", padding: 18, borderRadius: 15, alignItems: "center" }}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              {current === questions.length - 1 ? "Ver Resultado" : "Próxima Pergunta"}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={{ textAlign: "center", color: "#94A3B8" }}>Selecione uma resposta para continuar</Text>
        )}
      </View>
    </View>
  );
}