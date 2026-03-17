import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Onboarding() {

  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();

  const handleScroll = (event:any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slide);
  };

  return (
    <View style={{ flex: 1 }}>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >

        {/* SLIDE 1 */}
        <View style={{
          width,
          justifyContent:"center",
          alignItems:"center",
          backgroundColor:"#5C5CB3"
        }}>
          <Image
            source={require("../assets/images/card(1).png")}
            style={{ width:200, height:200, marginBottom:20 }}
          />
          <Text style={{ fontSize:28, color:"white" }}>
            Céu é o limite
          </Text>
        </View>

        {/* SLIDE 2 */}
        <View style={{
          width,
          justifyContent:"center",
          alignItems:"center",
          backgroundColor:"#000080"
        }}>
          <Image
            source={require("../assets/images/card(2).png")}
            style={{ width:200, height:200, marginBottom:20 }}
          />
          <Text style={{ fontSize:28, color:"white" }}>
            Rumo ao céu
          </Text>
        </View>

        {/* SLIDE 3 */}
        <View style={{
          width,
          justifyContent:"center",
          alignItems:"center",
          backgroundColor:"#5C5CB3"
        }}>
          <Image
            source={require("../assets/images/card(3).png")}
            style={{ width:200, height:200, marginBottom:20 }}
          />
          <Text style={{ fontSize:28, color:"white" }}>
            Controle e calma
          </Text>
        </View>

      </ScrollView>

      {/* PAGINATION DOTS */}
      <View style={{
        flexDirection:"row",
        position:"absolute",
        bottom:80,
        alignSelf:"center"
      }}>
        {[0,1,2].map((i)=>(
          <View
            key={i}
            style={{
              width:10,
              height:10,
              borderRadius:5,
              margin:5,
              backgroundColor: activeSlide === i ? "white" : "gray"
            }}
          />
        ))}
      </View>

      {/* BOTÃO IR PARA SIGNUP */}
      {activeSlide === 2 && (
        <TouchableOpacity
          onPress={() => router.replace("/signup")}
          style={{
            position:"absolute",
            bottom:40,
            right:30,
            width:60,
            height:60,
            borderRadius:30,
            backgroundColor:"white",
            justifyContent:"center",
            alignItems:"center",
            shadowColor:"#000",
            shadowOpacity:0.3,
            shadowRadius:5,
            elevation:5
          }}
        >
          <Text style={{ fontSize:24 }}>
            →
          </Text>
        </TouchableOpacity>
      )}

    </View>
  );
}