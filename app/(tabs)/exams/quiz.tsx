import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useState, useRef } from "react";

export default function Quiz(){

  const questions = [
    {
      question:"Qual altitude mínima para voo VFR sobre áreas povoadas?",
      options:["500ft","1000ft","1500ft","2000ft"],
      answer:1,
      explanation:"Sobre áreas povoadas o voo VFR deve manter pelo menos 1000 pés acima do obstáculo mais alto dentro de um raio de 600m."
    },
    {
      question:"O que significa VFR?",
      options:[
        "Visual Flight Rules",
        "Very Fast Route",
        "Vertical Flight Regulation",
        "Visual Flight Radar"
      ],
      answer:0,
      explanation:"VFR significa Visual Flight Rules, regras de voo visual utilizadas quando o piloto navega com referência visual ao terreno."
    }
  ];

  const [current,setCurrent] = useState(0);
  const [selected,setSelected] = useState<number | null>(null);
  const [score,setScore] = useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const xpAnim = useRef(new Animated.Value(0)).current;
  const xpOpacity = useRef(new Animated.Value(0)).current;

  const question = questions[current];

  const progress = (current + 1) / questions.length;

  function showXP(){

    xpAnim.setValue(0);
    xpOpacity.setValue(1);

    Animated.parallel([
      Animated.timing(xpAnim,{
        toValue:-40,
        duration:700,
        useNativeDriver:true
      }),
      Animated.timing(xpOpacity,{
        toValue:0,
        duration:700,
        useNativeDriver:true
      })
    ]).start();
  }

  function selectOption(index:number){

    if(selected !== null) return;

    setSelected(index);

    if(index === question.answer){
      setScore(score + 1);
      showXP();
    }
  }

  function nextQuestion(){

    Animated.timing(fadeAnim,{
      toValue:0,
      duration:200,
      useNativeDriver:true
    }).start(()=>{

      setSelected(null);
      setCurrent(current + 1);

      fadeAnim.setValue(0);

      Animated.timing(fadeAnim,{
        toValue:1,
        duration:200,
        useNativeDriver:true
      }).start();

    });

  }

  if(current >= questions.length){

    const stars = score * 10;

    return(
      <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      }}>

        <Text style={{fontSize:28,fontWeight:"bold"}}>
          Resultado
        </Text>

        <Text style={{marginTop:10}}>
          {score}/{questions.length}
        </Text>

        <Text style={{fontSize:22,marginTop:10}}>
          ⭐ {stars} estrelas
        </Text>

      </View>
    )
  }

  return(

    <View style={{flex:1,padding:20}}>

      {/* BARRA DE PROGRESSO */}

      <View style={{
        height:8,
        backgroundColor:"#e5e5e5",
        borderRadius:10,
        marginBottom:20
      }}>
        <View style={{
          height:8,
          width:`${progress * 100}%`,
          backgroundColor:"#2F6BFF",
          borderRadius:10
        }}/>
      </View>

      <Animated.View style={{opacity:fadeAnim}}>

        <Text style={{marginBottom:10}}>
          Pergunta {current+1}/{questions.length}
        </Text>

        <Text style={{
          fontSize:22,
          fontWeight:"bold",
          marginBottom:25
        }}>
          {question.question}
        </Text>

        {question.options.map((opt,i)=>{

          let bg = "#fff";

          if(selected !== null){

            if(i === question.answer){
              bg = "#c8f7c5";
            }

            else if(i === selected){
              bg = "#f7c5c5";
            }

          }

          return(
            <TouchableOpacity
              key={i}
              onPress={()=>selectOption(i)}
              style={{
                backgroundColor:bg,
                padding:18,
                borderRadius:12,
                marginBottom:12
              }}
            >
              <Text>{opt}</Text>
            </TouchableOpacity>
          )
        })}

      </Animated.View>

      {/* XP ANIMADO */}

      <Animated.Text
        style={{
          position:"absolute",
          top:120,
          alignSelf:"center",
          fontSize:26,
          fontWeight:"bold",
          color:"#2F6BFF",
          opacity:xpOpacity,
          transform:[{translateY:xpAnim}]
        }}
      >
        +10 XP
      </Animated.Text>

      {/* EXPLICAÇÃO */}

      {selected !== null && (

        <View style={{
          backgroundColor:"#fff",
          padding:18,
          borderRadius:15,
          marginTop:20
        }}>

          <Text style={{fontWeight:"bold",marginBottom:5}}>
            Explicação
          </Text>

          <Text>
            {question.explanation}
          </Text>

        </View>

      )}

      {/* BOTÃO NEXT */}

      {selected !== null && (

        <TouchableOpacity
          onPress={nextQuestion}
          style={{
            backgroundColor:"#2F6BFF",
            padding:18,
            borderRadius:12,
            marginTop:20,
            alignItems:"center"
          }}
        >
          <Text style={{color:"#fff"}}>
            Próxima pergunta
          </Text>
        </TouchableOpacity>

      )}

    </View>
  )
}