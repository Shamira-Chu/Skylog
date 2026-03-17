import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const { userName, userAvatar, setUserAvatar, xp, level, stars } = useAuth();
  
  const XP_PER_LEVEL = 5000;
  const currentLevelXp = xp % XP_PER_LEVEL;
  const maxXp = XP_PER_LEVEL;

  const avatars = [
    "account-outline",
    "account-tie-outline",
    "account-star-outline",
    "account-cowboy-hat-outline",
    "account-detective-outline",
    "account-hard-hat-outline",
  ];

  const user = {
    name: userName,
    license: "BR-ANAC-742615",
    levelTxt: level === 1 ? "Aluno Piloto" : level === 2 ? "Piloto Privado" : "Piloto Comercial",
    xpDisplay: currentLevelXp,
    maxXpDisplay: maxXp,
    starsDisplay: stars,
    medals: 8,
    studyHours: 42
  };

  const menuItems = [
    { icon: "crown-outline", label: "Atualizar Plano", color: "#B45309", path: "/plans" },
    { icon: "cog-outline", label: "Configurações", color: "#64748B" },
    { icon: "bell-outline", label: "Notificações", color: "#64748B" },
    { icon: "shield-check-outline", label: "Privacidade", color: "#64748B" },
    { icon: "help-circle-outline", label: "Ajuda & Suporte", color: "#64748B" },
  ];

  const handleMenuPress = (item: any) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  const achievements = [
    { id: 1, title: "Primeiro Solo", icon: "airplane-takeoff", unlocked: true, desc: "Fez seu primeiro simulado" },
    { id: 2, title: "Ás da ANAC", icon: "trophy-award", unlocked: true, desc: "Gabaritou uma banca" },
    { id: 3, title: "Navegador", icon: "compass-outline", unlocked: false, desc: "Concluiu Navegação Aérea" },
    { id: 4, title: "Noite de Voo", icon: "moon-waning-crescent", unlocked: false, desc: "Estudou após as 22h" },
  ];

  const rewardItems = [
    { title: "Curso: IFR Avançado", cost: 500, icon: "airplane-marker", info: "Especialização em voo por instrumentos." },
    { title: "Simulado: Banca VIP", cost: 200, icon: "fountain-pen-tip", info: "Bateria exclusiva com 100 questões ANAC." },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* HEADER AZUL */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <MaterialCommunityIcons name={userAvatar as any} size={50} color="#0B1E8A" />
            </View>
            <View style={styles.badgeLevel}>
              <MaterialCommunityIcons name="shield-star" size={16} color="white" />
            </View>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userLicense}>{user.license}</Text>
            <View style={styles.patentBadge}>
              <Text style={styles.patentText}>{user.levelTxt.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        {/* SELEÇÃO DE AVATAR */}
        <View style={{ marginTop: 25 }}>
          <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 12 }}>
            Escolha seu Avatar
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {avatars.map((av) => (
              <TouchableOpacity
                key={av}
                onPress={() => setUserAvatar(av)}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 22.5,
                  backgroundColor: userAvatar === av ? "#2F6BFF" : "rgba(255,255,255,0.1)",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                  borderWidth: userAvatar === av ? 2 : 0,
                  borderColor: "white"
                }}
              >
                <MaterialCommunityIcons name={av as any} size={24} color="white" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* PROGRESS BAR XP */}
        <View style={styles.xpContainer}>
          <View style={styles.xpHeader}>
            <Text style={styles.xpText}>Nível {level}</Text>
            <Text style={styles.xpText}>{user.xpDisplay} / {user.maxXpDisplay} XP</Text>
          </View>
          <View style={styles.xpBarBackground}>
            <View style={[styles.xpBarFill, { width: `${(user.xpDisplay / user.maxXpDisplay) * 100}%` }]} />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        
        {/* STATS CARDS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="star" size={24} color="#FBBF24" />
            <Text style={styles.statValue}>{user.starsDisplay}</Text>
            <Text style={styles.statLabel}>Estrelas</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="medal" size={24} color="#2F6BFF" />
            <Text style={styles.statValue}>{user.medals}</Text>
            <Text style={styles.statLabel}>Medalhas</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="clock-check" size={24} color="#10B981" />
            <Text style={styles.statValue}>{user.studyHours}h</Text>
            <Text style={styles.statLabel}>Estudos</Text>
          </View>
        </View>

        {/* LOJA DE RECOMPENSAS */}
        <Text style={styles.sectionTitle}>Troque seus pontos 🎁</Text>
        {rewardItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.rewardCard}>
            <View style={styles.rewardIconContainer}>
              <MaterialCommunityIcons name={item.icon as any} size={28} color="#0B1E8A" />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.rewardTitle}>{item.title}</Text>
              <Text style={styles.rewardInfo}>{item.info}</Text>
              <View style={styles.priceBadge}>
                <MaterialCommunityIcons name="star" size={14} color="#FBBF24" />
                <Text style={styles.priceText}>{item.cost} Estrelas</Text>
              </View>
            </View>
            <View style={styles.lockIcon}>
              <MaterialCommunityIcons name="lock-outline" size={20} color="#CBD5E1" />
            </View>
          </TouchableOpacity>
        ))}

        {/* MINHAS CONQUISTAS */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, marginBottom: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1E293B" }}>Minhas Conquistas 🎖️</Text>
          <TouchableOpacity><Text style={{ color: "#2F6BFF", fontSize: 13, fontWeight: "600" }}>Ver todas</Text></TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {achievements.map((item) => (
            <View 
              key={item.id} 
              style={{ 
                width: "48%", 
                backgroundColor: "white", 
                padding: 15, 
                borderRadius: 20, 
                marginBottom: 12,
                borderWidth: 1,
                borderColor: item.unlocked ? "#E2E8F0" : "#F1F5F9",
                alignItems: "center",
                opacity: item.unlocked ? 1 : 0.6
              }}
            >
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: item.unlocked ? "#F0F9FF" : "#F1F5F9",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10
              }}>
                <MaterialCommunityIcons 
                  name={item.icon as any} 
                  size={28} 
                  color={item.unlocked ? "#0B1E8A" : "#94A3B8"} 
                />
              </View>
              <Text style={{ fontSize: 13, fontWeight: "bold", color: "#1E293B", textAlign: "center" }}>{item.title}</Text>
              <Text style={{ fontSize: 10, color: "#64748B", textAlign: "center", marginTop: 4 }}>{item.desc}</Text>
            </View>
          ))}
        </View>

        {/* MENU OPTIONS */}
        <Text style={styles.sectionTitle}>Conta</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => handleMenuPress(item)}
              style={[styles.menuItem, index === menuItems.length - 1 && { borderBottomWidth: 0 }]}
            >
              <MaterialCommunityIcons name={item.icon as any} size={22} color={item.color} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#CBD5E1" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Versão 1.0.4 - Skylog ANAC</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#0B1E8A",
    paddingTop: 60,
    paddingHorizontal: 25,
    paddingBottom: 35,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.2)",
  },
  badgeLevel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2F6BFF",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0B1E8A",
  },
  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  userLicense: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    marginTop: 2,
  },
  patentBadge: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  patentText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  xpContainer: {
    marginTop: 30,
  },
  xpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  xpText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "600",
  },
  xpBarBackground: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
  },
  xpBarFill: {
    height: 8,
    backgroundColor: "#2F6BFF",
    borderRadius: 4,
  },
  content: {
    padding: 25,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -55,
  },
  statCard: {
    backgroundColor: "white",
    width: "31%",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 5,
  },
  statLabel: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 30,
    marginBottom: 15,
  },
  rewardCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  rewardIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#F1F5F9",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },
  rewardInfo: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  priceBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  priceText: {
    color: "#D97706",
    fontSize: 11,
    fontWeight: "bold",
    marginLeft: 4,
  },
  lockIcon: {
    padding: 10,
  },
  menuContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  menuLabel: {
    flex: 1,
    marginLeft: 15,
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "500",
  },
  logoutButton: {
    marginTop: 30,
    padding: 18,
    alignItems: "center",
  },
  logoutText: {
    color: "#EF4444",
    fontWeight: "bold",
    fontSize: 16,
  },
  versionText: {
    textAlign: "center",
    color: "#CBD5E1",
    fontSize: 12,
    marginTop: 20,
    marginBottom: 40,
  }
});