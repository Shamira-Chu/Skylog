import { View, Text, FlatList, Dimensions, Image, TouchableOpacity, StyleSheet, ListRenderItem } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRouter, Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: any;
  bgColor: string;
}

const SLIDES: Slide[] = [
  {
    id: "1",
    title: "Céu",
    subtitle: "é o limite",
    description: "Cada hora de voo é um passo mais alto na sua jornada",
    image: require("../assets/images/card(1).png"), // Usando ativos existentes por segurança de caminho
    bgColor: "#2F6BFF"
  },
  {
    id: "2",
    title: "Rumo",
    subtitle: "ao céu",
    description: "Com foco, estudo e treino, todo piloto encontra seu caminho nas nuvens",
    image: require("../assets/images/card(2).png"),
    bgColor: "#1E293B"
  },
  {
    id: "3",
    title: "Controle",
    subtitle: "e calma",
    description: "Na aviação, a mente tranquila e o controle preciso fazem toda a diferença",
    image: require("../assets/images/card(3).png"),
    bgColor: "#0B1E8A"
  }
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<FlatList>(null);
  const router = useRouter();
  const timerRef = useRef<any>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % SLIDES.length;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const scrollToIndex = (index: number) => {
    scrollRef.current?.scrollToIndex({
      index,
      animated: true
    });
    setCurrentIndex(index);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      scrollToIndex(currentIndex + 1);
    } else {
      router.replace("/login");
    }
  };

  const onScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const renderItem: ListRenderItem<Slide> = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.bgColor }]}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <FlatList
        ref={scrollRef}
        data={SLIDES}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        onScrollBeginDrag={stopAutoPlay}
        onScrollEndDrag={startAutoPlay}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <MaterialCommunityIcons 
            name={currentIndex === SLIDES.length - 1 ? "check" : "chevron-right"} 
            size={30} 
            color="#0B1E8A" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    height,
    padding: 30,
    justifyContent: "space-between",
    paddingTop: 100,
    paddingBottom: 100,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.4,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: "contain",
  },
  textContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 32,
    color: "rgba(255,255,255,0.8)",
    marginTop: -5,
  },
  description: {
    fontSize: 16,
    color: "rgba(255,255,255,0.6)",
    marginTop: 30,
    lineHeight: 24,
    maxWidth: "80%",
  },
  footer: {
    position: "absolute",
    bottom: 50,
    left: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  activeDot: {
    width: 30,
    backgroundColor: "white",
  },
  inactiveDot: {
    width: 15,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});