import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

export default function ClimaScreen() {
  const [cidade, setCidade] =
    useState("");

  const [clima, setClima] =
    useState(null);

  async function consultarClima() {
    try {
      const apiKey = "CHAVE_DA_API";

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
      );

      const data = await response.json();

      if (data.cod !== 200) {
        Alert.alert(
          "Cidade não encontrada"
        );
        return;
      }

      setClima(data);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Falha ao consultar clima."
      );
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />

      <Button
        title="Consultar Clima"
        onPress={consultarClima}
      />

      {clima && (
        <View style={styles.card}>
          <Text>
            Temperatura:
            {" "}
            {clima.main.temp}°C
          </Text>

          <Text>
            Umidade:
            {" "}
            {clima.main.humidity}%
          </Text>

          <Text>
            Condição:
            {" "}
            {clima.weather[0].description}
          </Text>
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
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },

  card: {
    marginTop: 20,
    backgroundColor: "#e2e8f0",
    padding: 15,
    borderRadius: 10,
  },
});