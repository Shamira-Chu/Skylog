import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { COURSES } from "../../constants/courses";

const { width } = Dimensions.get("window");

export default function CourseDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const course = COURSES[id as string];

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "m1": true,
  });

  if (!course) {
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons name="alert-circle-outline" size={60} color="#94A3B8" />
        <Text style={styles.errorText}>Curso não encontrado</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar para Estudos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true, 
          title: course.title,
          headerStyle: { backgroundColor: "#0B1E8A" },
          headerTintColor: "#fff",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15 }}>
              <MaterialCommunityIcons name="chevron-left" size={28} color="white" />
            </TouchableOpacity>
          )
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <Image source={course.bannerImage} style={styles.bannerImage} />
          <View style={styles.overlay} />
          <View style={styles.heroInfo}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>FORMAÇÃO PILOTO</Text>
            </View>
            <Text style={styles.title}>{course.title}</Text>
            <Text style={styles.description}>{course.description}</Text>
          </View>
        </View>

        {/* PROGRESS CARD */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressLabel}>Seu Progresso</Text>
              <Text style={styles.progressValue}>{course.completedLessons}/{course.totalLessons} lições</Text>
            </View>
            <View style={styles.percentageCircle}>
              <Text style={styles.percentageText}>{Math.round(course.progress * 100)}%</Text>
            </View>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${course.progress * 100}%` }]} />
          </View>
          <TouchableOpacity style={styles.continueButton}>
            <MaterialCommunityIcons name="play" size={20} color="white" />
            <Text style={styles.continueText}>Continuar de onde parou</Text>
          </TouchableOpacity>
        </View>

        {/* MODULES LIST */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Módulos do Curso</Text>
          
          {course.modules.map((module, index) => (
            <View key={module.id} style={styles.moduleWrapper}>
              <TouchableOpacity 
                style={styles.moduleHeader}
                onPress={() => toggleModule(module.id)}
                activeOpacity={0.7}
              >
                <View style={styles.moduleInfo}>
                  <View style={styles.moduleIndex}>
                    <Text style={styles.moduleIndexText}>{index + 1}</Text>
                  </View>
                  <View>
                    <Text style={styles.moduleTitle}>{module.title}</Text>
                    <Text style={styles.moduleDescription}>{module.lessons.length} aulas • Ativo</Text>
                  </View>
                </View>
                <MaterialCommunityIcons 
                  name={expandedModules[module.id] ? "chevron-up" : "chevron-down"} 
                  size={24} 
                  color="#64748B" 
                />
              </TouchableOpacity>

              {expandedModules[module.id] && (
                <View style={styles.lessonsContainer}>
                  {module.lessons.map((lesson) => (
                    <TouchableOpacity 
                      key={lesson.id} 
                      style={styles.lessonItem}
                      onPress={() => lesson.completed && router.push(`/lesson/${lesson.id}` as any)}
                    >
                      <View style={[styles.lessonIcon, { backgroundColor: lesson.completed ? "#EEF2FF" : "#F8FAFC" }]}>
                        <MaterialCommunityIcons 
                          name={lesson.type === 'video' ? "play-circle" : "file-document"} 
                          size={24} 
                          color={lesson.completed ? "#2F6BFF" : "#CBD5E1"} 
                        />
                      </View>
                      <View style={styles.lessonDetails}>
                        <Text style={[styles.lessonTitle, !lesson.completed && styles.lockedText]}>
                          {lesson.title}
                        </Text>
                        <Text style={styles.lessonMeta}>{lesson.duration} • {lesson.type.toUpperCase()}</Text>
                      </View>
                      {lesson.completed ? (
                        <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
                      ) : (
                        <MaterialCommunityIcons name="lock" size={20} color="#E2E8F0" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
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
    paddingBottom: 40,
  },
  heroSection: {
    height: 280,
    width: width,
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(11, 30, 138, 0.6)",
  },
  heroInfo: {
    position: "absolute",
    bottom: 40,
    left: 25,
    right: 25,
  },
  categoryBadge: {
    backgroundColor: "#2F6BFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  categoryText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 8,
    lineHeight: 20,
  },
  progressCard: {
    backgroundColor: "white",
    marginHorizontal: 25,
    marginTop: -30,
    borderRadius: 25,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  progressLabel: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
  },
  progressValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },
  percentageCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2F6BFF",
  },
  percentageText: {
    color: "#0B1E8A",
    fontWeight: "bold",
    fontSize: 14,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    marginBottom: 20,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: "#2F6BFF",
    borderRadius: 4,
  },
  continueButton: {
    backgroundColor: "#0B1E8A",
    flexDirection: "row",
    padding: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  continueText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 15,
  },
  contentSection: {
    padding: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 20,
  },
  moduleWrapper: {
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: "hidden",
  },
  moduleHeader: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  moduleInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  moduleIndex: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  moduleIndexText: {
    color: "#0B1E8A",
    fontWeight: "bold",
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },
  moduleDescription: {
    fontSize: 12,
    color: "#94A3B8",
  },
  lessonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#F8FAFC",
  },
  lessonIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  lessonDetails: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  lessonMeta: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
  },
  lockedText: {
    color: "#CBD5E1",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorText: {
    fontSize: 18,
    color: "#64748B",
    marginTop: 10,
    marginBottom: 30,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#0B1E8A",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 15,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
  }
});
