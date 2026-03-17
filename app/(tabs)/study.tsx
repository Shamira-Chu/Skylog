import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number; // 0 a 1
  category: "Teoria" | "Prática" | "Regulamentos";
  locked: boolean;
}

const COURSES: Course[] = [
  { 
    id: "1", 
    title: "Meteorologia", 
    description: "Estudo de fenômenos atmosféricos e sua influência no voo.",
    icon: "weather-partly-cloudy",
    progress: 0.4,
    category: "Teoria",
    locked: false
  },
  { 
    id: "2", 
    title: "Navegação Aérea", 
    description: "Cálculos de rota, derivas e uso de computador de voo.",
    icon: "map-marker-distance",
    progress: 0.7,
    category: "Prática",
    locked: false
  },
  { 
    id: "3", 
    title: "Regulamentos ANAC", 
    description: "Normas e leis que regem a aviação civil brasileira.",
    icon: "gavel",
    progress: 0.2,
    category: "Regulamentos",
    locked: false
  },
  { 
    id: "6", 
    title: "Inglês Técnico", 
    description: "Terminologia padrão OACI e fraseologia de tráfego aéreo.",
    icon: "translate",
    progress: 0,
    category: "Teoria",
    locked: false
  },
  { 
    id: "7", 
    title: "Fatores Humanos", 
    description: "Psicologia aplicada à aviação e gerenciamento de recursos.",
    icon: "account-group-outline",
    progress: 0,
    category: "Teoria",
    locked: false
  },
  { 
    id: "4", 
    title: "Teoria de Voo", 
    description: "Aerodinâmica, forças e princípios físicos da sustentação.",
    icon: "airplane-takeoff",
    progress: 0.0,
    category: "Teoria",
    locked: true
  },
  { 
    id: "5", 
    title: "Conhecimentos Técnicos", 
    description: "Estrutura de aeronaves, motores e sistemas embarcados.",
    icon: "engine-outline",
    progress: 0.0,
    category: "Teoria",
    locked: true
  },
];

const CATEGORIES = ["Todos", "Teoria", "Prática", "Regulamentos"];

export default function Study() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = COURSES.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "Todos" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const renderItem = ({ item }: { item: Course }) => {
    const isSuggested = item.progress === 0 && !item.locked;

    return (
      <TouchableOpacity 
        activeOpacity={item.locked ? 1 : 0.8}
        onPress={() => !item.locked && router.push(`/course/${item.id}` as any)}
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: 20,
          marginBottom: 15,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 2,
          flexDirection: "row",
          alignItems: "center",
          opacity: item.locked ? 0.6 : 1,
          borderWidth: isSuggested ? 1 : 0,
          borderColor: isSuggested ? "#E0E7FF" : "transparent"
        }}
      >
        <View style={{
          width: 55,
          height: 55,
          borderRadius: 15,
          backgroundColor: item.locked ? "#F1F5F9" : (isSuggested ? "#EEF2FF" : "#E0E7FF"),
          justifyContent: "center",
          alignItems: "center",
          marginRight: 15
        }}>
          <MaterialCommunityIcons 
            name={item.icon as any} 
            size={30} 
            color={item.locked ? "#94A3B8" : "#0B1E8A"} 
          />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold", color: item.locked ? "#64748B" : "#1E293B" }} numberOfLines={1}>
                {item.title}
              </Text>
              {item.locked && (
                <MaterialCommunityIcons name="lock" size={16} color="#94A3B8" style={{ marginLeft: 6 }} />
              )}
            </View>
            {isSuggested && (
              <View style={{
                backgroundColor: "#E0E7FF",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 8,
              }}>
                <Text style={{ fontSize: 10, fontWeight: "bold", color: "#0B1E8A" }}>SUGESTÃO</Text>
              </View>
            )}
          </View>
          
          <Text style={{ fontSize: 13, color: "#64748B", marginTop: 2 }} numberOfLines={1}>
            {item.locked ? "Conclua os módulos anteriores para liberar" : item.description}
          </Text>
          
          {/* Progress Bar Area */}
          {!item.locked && (
            <View style={{ marginTop: 12 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                <Text style={{ fontSize: 11, color: "#94A3B8" }}>
                  {isSuggested ? "Não iniciado" : "Progresso"}
                </Text>
                <Text style={{ fontSize: 11, color: "#0B1E8A", fontWeight: "bold" }}>
                  {Math.round(item.progress * 100)}%
                </Text>
              </View>
              <View style={{ height: 6, backgroundColor: "#F1F5F9", borderRadius: 3 }}>
                <View style={{ 
                  height: 6, 
                  backgroundColor: isSuggested ? "#CBD5E1" : "#2F6BFF", 
                  borderRadius: 3, 
                  width: isSuggested ? "5%" : `${item.progress * 100}%` 
                }} />
              </View>
            </View>
          )}
        </View>

        {!item.locked && (
          <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" style={{ marginLeft: 10 }} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      
      {/* HEADER AZUL */}
      <View style={{
        backgroundColor: "#0B1E8A",
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 25,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
      }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>Meus Estudos</Text>
        <Text style={{ color: "rgba(255,255,255,0.7)", marginTop: 4 }}>Continue de onde parou</Text>

        {/* SEARCH BAR */}
        <View style={{
          backgroundColor: "white",
          borderRadius: 15,
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          height: 50
        }}>
          <MaterialCommunityIcons name="magnify" size={22} color="#94A3B8" />
          <TextInput
            placeholder="Buscar por matéria ou assunto..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#94A3B8"
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 15,
              color: "#1E293B"
            }}
          />
        </View>
      </View>

      {/* CATEGORIES FILTERS */}
      <View style={{ marginTop: 20 }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 10,
                borderRadius: 12,
                backgroundColor: activeCategory === cat ? "#0B1E8A" : "white",
                marginRight: 10,
                borderWidth: activeCategory === cat ? 0 : 1,
                borderColor: "#E2E8F0"
              }}
            >
              <Text style={{ 
                color: activeCategory === cat ? "white" : "#64748B",
                fontWeight: activeCategory === cat ? "bold" : "600",
                fontSize: 14
              }}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20, paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={{ marginTop: 50, alignItems: "center" }}>
            <MaterialCommunityIcons name="book-search-outline" size={60} color="#CBD5E1" />
            <Text style={{ color: "#94A3B8", marginTop: 10, fontSize: 16 }}>Nenhum curso encontrado.</Text>
          </View>
        )}
      />

    </View>
  );
}