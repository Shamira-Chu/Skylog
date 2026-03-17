import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { userName } = useAuth();

  // Se o usuário já cadastrou um nome (ou seja, não é mais o padrão "Piloto")
  // pulamos a splash e o onboarding e vamos direto para a home.
  if (userName && userName !== "Piloto") {
    return <Redirect href={"/(tabs)" as any} />;
  }

  return <Redirect href={"/splash" as any} />;
}