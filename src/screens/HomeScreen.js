import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function HomeScreen({ navigation }) {
  const menus = [
    { titulo: "Calculadora IMC", tela: "IMC" },
    { titulo: "Leitor QR Code", tela: "QR Code" },
    { titulo: "Lista de Tarefas", tela: "Tarefas" },
    { titulo: "Conversor de Moedas", tela: "Moedas" },
    { titulo: "Consulta CEP", tela: "CEP" },
    { titulo: "Consulta Clima", tela: "Clima" },
    { titulo: "Perfil do Usuário", tela: "Perfil" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        Super App do Aluno
      </Text>

      {menus.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => navigation.navigate(item.tela)}
        >
          <Text style={styles.cardTexto}>
            {item.titulo}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#2563eb",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },

  cardTexto: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});