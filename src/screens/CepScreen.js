import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

export default function CepScreen() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] =
    useState(null);

  async function consultarCEP() {
    try {
      if (cep.length !== 8) {
        Alert.alert(
          "CEP inválido",
          "Digite 8 números."
        );
        return;
      }

      const response = await fetch(
        `https://viacep.com.br/ws/${cep}/json/`
      );

      const data = await response.json();

      if (data.erro) {
        Alert.alert(
          "CEP não encontrado"
        );
        return;
      }

      setEndereco(data);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Falha ao consultar CEP."
      );
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        keyboardType="numeric"
        value={cep}
        onChangeText={setCep}
      />

      <Button
        title="Consultar"
        onPress={consultarCEP}
      />

      {endereco && (
        <View style={styles.card}>
          <Text>
            Rua: {endereco.logradouro}
          </Text>

          <Text>
            Bairro: {endereco.bairro}
          </Text>

          <Text>
            Cidade: {endereco.localidade}
          </Text>

          <Text>
            Estado: {endereco.uf}
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