import { View, Text, TextInput, FlatList } from "react-native";
import { useState } from "react";

const courses = [
  { id: "1", title: "Meteorologia" },
  { id: "2", title: "Navegação Aérea" },
  { id: "3", title: "Regulamentos ANAC" },
  { id: "4", title: "Teoria de Voo" },
];

export default function Study() {

  const [search,setSearch] = useState("");

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return(
    <View style={{flex:1,padding:20}}>

      <TextInput
        placeholder="Buscar cursos..."
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor:"#f0f0f0",
          padding:14,
          borderRadius:10,
          marginBottom:20
        }}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          <View style={{
            padding:18,
            backgroundColor:"#fff",
            borderRadius:12,
            marginBottom:12
          }}>
            <Text style={{fontSize:18}}>
              {item.title}
            </Text>
          </View>
        )}
      />

    </View>
  )
}