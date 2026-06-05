import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

export default function MoedasScreen() {
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState(null);

  async function converter() {
    try {
      const response = await fetch(
        "https://open.er-api.com/v6/latest/BRL"
      );

      const data = await response.json();

      const reais = Number(valor);

      setResultado({
        usd: (reais * data.rates.USD).toFixed(2),
        eur: (reais * data.rates.EUR).toFixed(2),
        gbp: (reais * data.rates.GBP).toFixed(2),
      });
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível consultar as moedas."
      );
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Valor em Reais"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <Button
        title="Converter"
        onPress={converter}
      />

      {resultado && (
        <View style={styles.card}>
          <Text>Dólar: US$ {resultado.usd}</Text>
          <Text>Euro: € {resultado.eur}</Text>
          <Text>Libra: £ {resultado.gbp}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },

  card: {
    marginTop: 20,
    backgroundColor: "#e2e8f0",
    padding: 15,
    borderRadius: 10,
  },
});