import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TarefaItem({
  tarefa,
  concluir,
  excluir
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.textoArea}
        onPress={() => concluir(tarefa.id)}
      >
        <Text
          style={[
            styles.texto,
            tarefa.concluida && styles.concluida
          ]}
        >
          {tarefa.titulo}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => excluir(tarefa.id)}
      >
        <Text style={styles.textoBotao}>
          Excluir
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },

  textoArea: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 15,
    borderRadius: 10,
  },

  texto: {
    fontSize: 16,
  },

  concluida: {
    textDecorationLine: "line-through",
    color: "gray",
  },

  botaoExcluir: {
    backgroundColor: "#dc2626",
    marginLeft: 10,
    padding: 12,
    borderRadius: 10,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});