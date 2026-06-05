import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Linking,
  Vibration,
  Alert,
} from "react-native";

import { CameraView, useCameraPermissions }
from "expo-camera";

import AsyncStorage
from "@react-native-async-storage/async-storage";

export default function QrCodeScreen() {
  const [permission, requestPermission] =
    useCameraPermissions();

  const [conteudo, setConteudo] = useState("");
  const [escaneado, setEscaneado] =
    useState(false);

  const [historico, setHistorico] =
    useState([]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  async function carregarHistorico() {
    const dados =
      await AsyncStorage.getItem("qrhist");

    if (dados) {
      setHistorico(JSON.parse(dados));
    }
  }

  async function salvarHistorico(valor) {
    const novo = [
      ...historico,
      {
        id: Date.now().toString(),
        qr: valor,
        data: new Date().toLocaleString(),
      },
    ];

    setHistorico(novo);

    await AsyncStorage.setItem(
      "qrhist",
      JSON.stringify(novo)
    );
  }

  function executarAcao(data) {
    if (data === "VIBRAR") {
      Vibration.vibrate(1000);
    }

    else if (
      data.startsWith("SITE:")
    ) {
      const url =
        data.replace("SITE:", "");

      Linking.openURL(url);
    }

    else if (
      data.startsWith("MENSAGEM:")
    ) {
      Alert.alert(
        data.replace(
          "MENSAGEM:",
          ""
        )
      );
    }
  }

  function lerQRCode({ data }) {
    setEscaneado(true);

    setConteudo(data);

    salvarHistorico(data);

    executarAcao(data);
  }

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>
          Carregando câmera...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>
          Permissão necessária
        </Text>

        <Button
          title="Permitir"
          onPress={
            requestPermission
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraArea}>
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={
            escaneado
              ? undefined
              : lerQRCode
          }
        />
      </View>

      <Text style={styles.resultado}>
        {conteudo ||
          "Nenhum QR lido"}
      </Text>

      {escaneado && (
        <Button
          title="Ler novamente"
          onPress={() => {
            setEscaneado(false);
            setConteudo("");
          }}
        />
      )}

      <FlatList
        style={{ marginTop: 20 }}
        data={historico}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (
          <View
            style={
              styles.itemHistorico
            }
          >
            <Text>{item.qr}</Text>
            <Text>{item.data}</Text>
          </View>
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

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraArea: {
    height: 250,
    borderRadius: 15,
    overflow: "hidden",
  },

  camera: {
    flex: 1,
  },

  resultado: {
    marginVertical: 15,
    textAlign: "center",
    fontSize: 16,
  },

  itemHistorico: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
});