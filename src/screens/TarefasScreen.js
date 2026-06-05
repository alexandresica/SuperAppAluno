import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import TarefaItem from "../components/TarefaItem";

export default function TarefasScreen() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      const dados = await AsyncStorage.getItem("tarefas");

      if (dados) {
        setTarefas(JSON.parse(dados));
      }
    } catch {
      Alert.alert("Erro ao carregar tarefas");
    }
  }

  async function salvarTarefas(lista) {
    setTarefas(lista);

    await AsyncStorage.setItem(
      "tarefas",
      JSON.stringify(lista)
    );
  }

  function adicionarTarefa() {
    if (!texto.trim()) return;

    const nova = {
      id: Date.now().toString(),
      titulo: texto,
      concluida: false,
    };

    const lista = [...tarefas, nova];

    salvarTarefas(lista);
    setTexto("");
  }

  function concluir(id) {
    const lista = tarefas.map((item) =>
      item.id === id
        ? {
            ...item,
            concluida: !item.concluida,
          }
        : item
    );

    salvarTarefas(lista);
  }

  function excluir(id) {
    const lista = tarefas.filter(
      (item) => item.id !== id
    );

    salvarTarefas(lista);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nova tarefa"
        value={texto}
        onChangeText={setTexto}
      />

      <Button
        title="Adicionar"
        onPress={adicionarTarefa}
      />

      <FlatList
        style={{ marginTop: 20 }}
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TarefaItem
            tarefa={item}
            concluir={concluir}
            excluir={excluir}
          />
        )}
      />
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
    marginBottom: 10,
  },
});