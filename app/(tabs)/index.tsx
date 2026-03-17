import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image
} from "react-native";

export default function Home() {

  const user = {
    name: "Thiago",
    license: "BR-ANAC-742615"
  };

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

          {/* TITLE */}
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: "bold"
            }}>
              Course
            </Text>

            <Text style={{ fontSize: 20 }}>
              ✕
            </Text>
          </View>


          {/* CARDS */}
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20
          }}>

            <View style={{
              backgroundColor: "#444",
              borderRadius: 15,
              padding: 20,
              width: "48%"
            }}>
              <Text style={{ color: "white" }}>
                Courses
              </Text>

              <Text style={{
                color: "white",
                marginTop: 5
              }}>
                2016
              </Text>
            </View>


            <View style={{
              backgroundColor: "#444",
              borderRadius: 15,
              padding: 20,
              width: "48%"
            }}>
              <Text style={{ color: "white" }}>
                Formations
              </Text>

              <Text style={{
                color: "white",
                marginTop: 5
              }}>
                800
              </Text>
            </View>

          </View>


          {/* ICON BUTTONS */}
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 25
          }}>

            {[1,2,3,4].map((i)=>(
              <View key={i} style={{ alignItems:"center" }}>

                <View style={{
                  width:60,
                  height:60,
                  borderRadius:30,
                  backgroundColor:"#D9D9D9",
                  justifyContent:"center",
                  alignItems:"center"
                }}>
                  <Text>{"</>"}</Text>
                </View>

                <Text style={{ marginTop:8 }}>
                  Code
                </Text>

              </View>
            ))}

          </View>


          {/* FORMATIONS TITLE */}
          <Text style={{
            marginTop: 30,
            fontSize: 18,
            fontWeight: "bold"
          }}>
            Formations
          </Text>


          {/* COURSE CARD */}
          <View style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 15,
            marginTop: 15
          }}>

            <Image
              source={require("../../assets/images/course.jpeg")}
              style={{
                width: "100%",
                height: 120,
                borderRadius: 15
              }}
            />

            <Text style={{
              fontWeight: "bold",
              marginTop: 10
            }}>
              Design System
            </Text>

            <Text style={{
              color: "gray",
              marginTop: 5
            }}>
              In this course you'll learn everything there is to know about Design Systems
            </Text>


            {/* PROGRESS BAR */}
            <View style={{
              height: 6,
              backgroundColor: "#E0E0E0",
              borderRadius: 5,
              marginTop: 15
            }}>
              <View style={{
                width: "80%",
                height: 6,
                backgroundColor: "#2F6BFF",
                borderRadius: 5
              }} />
            </View>


            <Text style={{
              alignSelf: "flex-end",
              marginTop: 5,
              fontSize: 12
            }}>
              8/10 courses
            </Text>

          </View>

        </ScrollView>

      </View>

    </View>
  );
}