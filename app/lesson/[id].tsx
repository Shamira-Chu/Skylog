import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LessonView() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true, 
          title: "Aula",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color="black" style={{ marginLeft: 15 }} />
            </TouchableOpacity>
          )
        }} 
      />

      <View style={styles.videoPlaceholder}>
        <Ionicons name="play-circle" size={80} color="white" />
        <Text style={styles.videoText}>Reproduzindo Conteúdo...</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Material de Apoio</Text>
        <Text style={styles.description}>
          Esta é uma visualização simulada do conteúdo da aula {id}. 
          Aqui você encontraria o vídeo principal, apostilas em PDF e materiais digitais relacionados ao tópico.
        </Text>

        <TouchableOpacity style={styles.downloadButton}>
          <Ionicons name="document-text" size={20} color="white" />
          <Text style={styles.downloadText}>Baixar Apostila Digital</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.downloadButton, { backgroundColor: "#444", marginTop: 10 }]}>
          <Ionicons name="cloud-download" size={20} color="white" />
          <Text style={styles.downloadText}>Salvar para Offline</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  videoPlaceholder: {
    width: "100%",
    aspectRatio: 16/9,
    backgroundColor: "#1A202C",
    justifyContent: "center",
    alignItems: "center",
  },
  videoText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1A202C",
  },
  description: {
    fontSize: 16,
    color: "#4A5568",
    lineHeight: 24,
    marginBottom: 30,
  },
  downloadButton: {
    flexDirection: "row",
    backgroundColor: "#2F6BFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  downloadText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  }
});
