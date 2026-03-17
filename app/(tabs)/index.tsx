import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COURSES } from "../../constants/courses";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { userName } = useAuth();

  const user = {
    name: userName,
    license: "BR-ANAC-742615"
  };

  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#0B1E8A" }}>

      {/* HEADER */}
      <ImageBackground
        source={require("../../assets/images/Vector.png")}
        resizeMode="cover"
        style={{
          height: 220,
          padding: 25,
          justifyContent: "center"
        }}
      >
        <Text style={{
          fontSize: 28,
          color: "white",
          fontWeight: "bold"
        }}>
          Olá {user.name}
        </Text>

        <Text style={{
          color: "white",
          marginTop: 5
        }}>
          {user.license}
        </Text>

      </ImageBackground>


      {/* PAINEL BRANCO */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#F2F2F2",
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 20
        }}
      >

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Text style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#1A202C"
            }}>
              Cursos
            </Text>

            <TouchableOpacity>
              <Ionicons name="close" size={28} color="#1A202C" />
            </TouchableOpacity>
          </View>


          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20
          }}>

            {/* CARD 1: PRÓXIMO OBJETIVO */}
            <TouchableOpacity 
              onPress={() => router.push("/(tabs)/profile" as any)}
              activeOpacity={0.8}
              style={{
                backgroundColor: "#0B1E8A",
                borderRadius: 15,
                padding: 15,
                width: "48%",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <MaterialCommunityIcons name="medal-outline" size={32} color="#F59E0B" />
              <View style={{ marginLeft: 8, flex: 1 }}>
                <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 10, fontWeight: "bold" }}>PRÓXIMO OBJETIVO</Text>
                <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }} numberOfLines={1}>Ás da ANAC</Text>
                <Text style={{ color: "#F59E0B", fontSize: 10, fontWeight: "600" }}>Falta 1 Simulado</Text>
              </View>
            </TouchableOpacity>

            {/* CARD 2: RETOMAR AULA */}
            <TouchableOpacity 
              onPress={() => router.push("/course/1" as any)} // Id fixo para exemplo, levaria para a última aula
              activeOpacity={0.8}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 15,
                padding: 15,
                width: "48%",
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#E2E8F0"
              }}
            >
              <MaterialCommunityIcons name="play-circle" size={32} color="#0B1E8A" />
              <View style={{ marginLeft: 8, flex: 1 }}>
                <Text style={{ color: "#64748B", fontSize: 10, fontWeight: "bold" }}>RETOMAR AULA</Text>
                <Text style={{ color: "#1E293B", fontSize: 12, fontWeight: "bold" }} numberOfLines={1}>Nuvens e Visib.</Text>
                <Text style={{ color: "#0B1E8A", fontSize: 10, fontWeight: "600" }}>Meteorologia</Text>
              </View>
            </TouchableOpacity>
          </View>


          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 25
          }}>

            {[
              { label: "Cronograma", icon: "calendar-check", path: "/schedule" },
              { label: "Biblioteca", icon: "book-open-variant", path: "/library" },
              { label: "Desempenho", icon: "chart-bar", path: "/performance" },
              { label: "Planos PRO", icon: "crown", color: "#B45309", path: "/plans" }
            ].map((item, i) => (
              <TouchableOpacity 
                key={i} 
                activeOpacity={0.7}
                onPress={() => item.path && router.push(item.path as any)}
                style={{ alignItems: "center", width: "23%" }}
              >
                <View style={{
                  width: 65,
                  height: 65,
                  borderRadius: 35,
                  backgroundColor: item.label === "Planos PRO" ? "#FEF3C7" : "#D9E2EC",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <MaterialCommunityIcons 
                    name={item.icon as any} 
                    size={32} 
                    color={item.color || "#475569"} 
                  />
                </View>
                <Text style={{ 
                  marginTop: 8, 
                  textAlign: "center", 
                  fontSize: 11,
                  fontWeight: "600",
                  color: "#1A202C"
                }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}

          </View>


          {/* FORMATIONS TITLE */}
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
            <MaterialCommunityIcons name="playlist-play" size={32} color="black" />
            <Text style={{
              fontSize: 22,
              fontWeight: "bold",
              marginLeft: 10
            }}>
              Formações
            </Text>
          </View>


          {Object.values(COURSES).map((course) => (
            <TouchableOpacity 
              key={course.id}
              onPress={() => !course.locked && router.push(`/course/${course.id}` as any)}
              activeOpacity={course.locked ? 1 : 0.9}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                padding: 15,
                marginTop: 15,
                opacity: course.locked ? 0.6 : 1
              }}
            >
              <View>
                <Image
                  source={course.bannerImage}
                  style={{
                    width: "100%",
                    height: 120,
                    borderRadius: 15
                  }}
                />
                {course.locked && (
                  <View style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <MaterialCommunityIcons name="lock" size={40} color="white" />
                  </View>
                )}
              </View>

              <Text style={{
                fontWeight: "bold",
                marginTop: 10,
                color: "#1A202C"
              }}>
                {course.title}
              </Text>

              <Text style={{
                color: "gray",
                marginTop: 5,
                fontSize: 13
              }} numberOfLines={3}>
                {course.description}
              </Text>


              {/* PROGRESS BAR */}
              <View style={{
                height: 6,
                backgroundColor: "#E0E0E0",
                borderRadius: 5,
                marginTop: 15
              }}>
                <View style={{
                  width: `${(course.progress || 0) * 100}%`,
                  height: 6,
                  backgroundColor: course.locked ? "#CBD5E1" : "#2F6BFF",
                  borderRadius: 5
                }} />
              </View>


              <Text style={{
                alignSelf: "flex-end",
                marginTop: 5,
                fontSize: 12,
                color: "#64748B"
              }}>
                {course.completedLessons}/{course.totalLessons} aulas
              </Text>

            </TouchableOpacity>
          ))}

        </ScrollView>

      </View>

    </View>
  );
}