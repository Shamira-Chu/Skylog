import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2F6BFF"
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="study"
        options={{
          title: "Study",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="exams/index"
        options={{
          title: "Simulados",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school" size={size} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          )
        }}
      />

      {/* Hide the quiz screen from the bottom tab bar */}
      <Tabs.Screen
        name="exams/quiz"
        options={{
          href: null,
          title: "Quiz",
        }}
      />

    </Tabs>
  );
}
