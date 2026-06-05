import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from "react-native";

export default function ImcScreen() {
  const [nome, setNome] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState("");

  function calcularIMC() {
    const imc = Number(peso) / (Number(altura) * Number(altura));

    let classificacao = "";

    if (imc < 18.5)
      classificacao = "Magreza";
    else if (imc < 25)
      classificacao = "Normal";
    else if (imc < 30)
      classificacao = "Sobrepeso";
    else if (imc < 40)
      classificacao = "Obesidade";
    else
      classificacao = "Obesidade Grave";

    setResultado(
      `${nome}\nIMC: ${imc.toFixed(2)}\n${classificacao}`
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Peso"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Altura"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <Button
        title="Calcular IMC"
        onPress={calcularIMC}
      />

      <Text style={styles.resultado}>
        {resultado}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },

  resultado: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});