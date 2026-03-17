import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Exams(){

  const router = useRouter();

  const simulados = [
    { id:1, title:"Meteorologia", questions:10 },
    { id:2, title:"Navegação Aérea", questions:10 },
    { id:3, title:"Regulamentos ANAC", questions:10 }
  ];

  return(

    <View style={{flex:1,padding:20}}>

      <Text style={{fontSize:22,fontWeight:"bold",marginBottom:20}}>
        Simulados
      </Text>

      {simulados.map(sim =>(

        <TouchableOpacity
          key={sim.id}
          onPress={()=>router.push("/exams/quiz")}
          style={{
            backgroundColor:"#fff",
            padding:20,
            borderRadius:15,
            marginBottom:15
          }}
        >

          <Text style={{fontSize:18,fontWeight:"bold"}}>
            {sim.title}
          </Text>

          <Text style={{color:"gray"}}>
            {sim.questions} perguntas
          </Text>

        </TouchableOpacity>

      ))}

    </View>
  )
}