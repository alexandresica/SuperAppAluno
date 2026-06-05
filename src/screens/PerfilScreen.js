import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import AsyncStorage
from "@react-native-async-storage/async-storage";

export default function PerfilScreen() {
  const [nome, setNome] =
    useState("");

  const [curso, setCurso] =
    useState("");

  const [email, setEmail] =
    useState("");

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function carregarPerfil() {
    try {
      const dados =
        await AsyncStorage.getItem(
          "perfil"
        );

      if (dados) {
        const perfil =
          JSON.parse(dados);

        setNome(perfil.nome);
        setCurso(perfil.curso);
        setEmail(perfil.email);
      }
    } catch {
      Alert.alert(
        "Erro ao carregar perfil"
      );
    }
  }

  async function salvarPerfil() {
    try {
      const perfil = {
        nome,
        curso,
        email,
      };

      await AsyncStorage.setItem(
        "perfil",
        JSON.stringify(perfil)
      );

      Alert.alert(
        "Sucesso",
        "Perfil salvo."
      );
    } catch {
      Alert.alert(
        "Erro ao salvar perfil"
      );
    }
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
        placeholder="Curso"
        value={curso}
        onChangeText={setCurso}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />

      <Button
        title="Salvar Perfil"
        onPress={salvarPerfil}
      />

      <Text style={styles.info}>
        Dados armazenados localmente
        usando AsyncStorage.
      </Text>
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

  info: {
    marginTop: 20,
    textAlign: "center",
  },
});