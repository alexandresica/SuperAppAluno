import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ImcScreen from "../screens/ImcScreen";
import QrCodeScreen from "../screens/QrCodeScreen";
import TarefasScreen from "../screens/TarefasScreen";
import MoedasScreen from "../screens/MoedasScreen";
import CepScreen from "../screens/CepScreen";
import ClimaScreen from "../screens/ClimaScreen";
import PerfilScreen from "../screens/PerfilScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#2563eb",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Super App do Aluno",
        }}
      />

      <Stack.Screen
        name="IMC"
        component={ImcScreen}
      />

      <Stack.Screen
        name="QR Code"
        component={QrCodeScreen}
      />

      <Stack.Screen
        name="Tarefas"
        component={TarefasScreen}
      />

      <Stack.Screen
        name="Moedas"
        component={MoedasScreen}
      />

      <Stack.Screen
        name="CEP"
        component={CepScreen}
      />

      <Stack.Screen
        name="Clima"
        component={ClimaScreen}
      />

      <Stack.Screen
        name="Perfil"
        component={PerfilScreen}
      />
    </Stack.Navigator>
  );
}