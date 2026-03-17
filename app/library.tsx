import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from "react-native";
import { Stack, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BOOKS = [
  { id: "1", title: "RBAC 61", category: "Regulamentação", type: "PDF", size: "2.4 MB" },
  { id: "2", title: "Manual de Manobras PPA", category: "Instrução", type: "PDF", size: "5.8 MB" },
  { id: "3", title: "Manual de Meteorologia", category: "Meteorologia", type: "EPUB", size: "1.2 MB" },
  { id: "4", title: "Guia de Navegação Visual", category: "Navegação", type: "PDF", size: "8.1 MB" },
  { id: "5", title: "ICA 100-12 (Tráfego)", category: "Regulamentação", type: "PDF", size: "3.5 MB" },
  { id: "6", title: "Manual Básico de Voo", category: "Teoria", type: "PDF", size: "12 MB" },
];

export default function LibraryScreen() {
  const [search, setSearch] = useState("");
  
  const filteredBooks = BOOKS.filter(book => 
    book.title.toLowerCase().includes(search.toLowerCase()) || 
    book.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: "Biblioteca ANAC",
        headerStyle: { backgroundColor: "#0B1E8A" },
        headerTintColor: "#fff"
      }} />

      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" size={24} color="#94A3B8" />
        <TextInput 
          placeholder="Buscar manuais, RBACs..." 
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Documentação Técnica</Text>
        
        {filteredBooks.map((item) => (
          <TouchableOpacity key={item.id} style={styles.docCard}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons 
                name={item.type === "PDF" ? "file-pdf-box" : "book-open-page-variant"} 
                size={32} 
                color={item.type === "PDF" ? "#EF4444" : "#3B82F6"} 
              />
            </View>
            <View style={styles.docInfo}>
              <Text style={styles.docTitle}>{item.title}</Text>
              <Text style={styles.docMeta}>{item.category} • {item.size}</Text>
            </View>
            <View style={styles.downloadBtn}>
              <MaterialCommunityIcons name="download-outline" size={24} color="#0B1E8A" />
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Mais manuais em breve no plano Pro.</Text>
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    marginBottom: 0,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 50,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 20,
  },
  docCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    elevation: 1,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  docInfo: {
    flex: 1,
    marginLeft: 15,
  },
  docTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },
  docMeta: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  downloadBtn: {
    padding: 5,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 30,
    padding: 20,
  },
  emptyText: {
    color: "#94A3B8",
    fontSize: 14,
    fontStyle: "italic",
  }
});
