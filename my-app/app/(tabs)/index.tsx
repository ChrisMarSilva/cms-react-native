import { useEffect, useState } from "react";
import { Image, StyleSheet, Platform, Text, LogBox } from "react-native";
import axios from "axios";
//import { hubConnection } from "signalr-no-jquery";
import * as SignalR from "@microsoft/signalr";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs(true);

export default function HomeScreen() {
  const [message, setMessage] = useState("Aguardando mensagem...");

  useEffect(() => {
    //_signalrByNoJquery();
    //_signalrByMicrosoft();
    _signalrByWebSocket();
    // return () => { }
  }, []);

  // const _signalrByNoJquery = () => {
  //   try {
  //     console.log("SignalR by signalr-no-jquery");

  //     const connection = hubConnection("https://localhost:41557");
  //     const hubProxy = connection.createHubProxy("chat");

  //     hubProxy.on("ReceiveMessage", (user, message): void => {
  //       console.log("connection.ReceiveMessage: ", `${user}: ${message}`);
  //     });

  //     connection
  //       .start() // { jsonp: true }
  //       .done(() => console.log("Conectado ao SignalR"))
  //       .fail((error: any) =>
  //         console.log("Erro ao conectar ao SignalR: ", error)
  //       );

  //     // const connection = new signalR.HubConnectionBuilder().withUrl(url).build()
  //     // connection.on('ReceiveMessage', (user, message) => {
  //     // console.log("connection.ReceiveMessage: ", `${user}: ${message}`);
  //     // });

  //     // connection
  //     //     .start()
  //     //     .then(() => {
  //     //         console.log('Conexão com SignalR estabelecida com sucesso.')
  //     //     })
  //     //     .catch((error) => {
  //     //         console.error('Erro ao estabelecer conexão com SignalR:', error)
  //     //     })

  //     // connection.onclose(() => {
  //     //     console.log('connection.onclose')
  //     //     connection.start() // trying to reconnect
  //     // })
  //   } catch (error: any) {
  //     console.error(error);
  //   }
  // };

  const _signalrByMicrosoft = () => {
    try {
      console.log("SignalR by signalr-no-jquery");

      const connection = new SignalR.HubConnectionBuilder()
        .withUrl("https://localhost:41557/chat", {
          // wss://localhost:41557/chat?id=XtsIQgeTXpEako_UN3w2PQ // "https://localhost:41557/chat"

          transport:
            ///SignalR.HttpTransportType.WebSockets |
            SignalR.HttpTransportType.LongPolling,
          headers: {
            "content-type": "application/json",
          },
        })
        .configureLogging(SignalR.LogLevel.Trace)
        .build();

      connection.on("broadcastMessage", (name, message) => {
        // ReceiveMessage
        // message
        console.log(`Mensagem recebida: ${name}: ${message}`);
        setMessage(`${name}: ${message}`);
      });

      connection
        .start()
        .then(() => {
          console.log("Conexão com SignalR estabelecida com sucesso.");

          connection.invoke("send", "ReactNative", "teste123");
        })
        .catch((error: any) => {
          setMessage(
            `Erro ao estabelecer conexão com SignalR: ${error.message}`
          );
          console.error(error.message);
        });
    } catch (error: any) {
      console.error(error);
      setMessage(`Erro-Geral: ${error.message}`);
    }
  };

  const _signalrByWebSocket = () => {
    try {
      const ws = new WebSocket("wss://localhost:41557/chat"); // wss://localhost:41557/chat

      ws.onopen = () => {
        console.log("Conectado ao WebSocket");
        setMessage(`Conectado ao WebSocket`);
        //ws.send("Hello Server!"); // Envie uma mensagem ao servidor WebSocket
      };

      ws.onmessage = (e) => {
        const receivedMessage = e.data;
        console.log("receivedMessage: ", receivedMessage);
        setMessage(receivedMessage);
      };

      ws.onerror = (error: any) => {
        setMessage(`WebSocket Error: ${error.message}`);
        console.log("WebSocket Error: ", error.message);
      };

      ws.onclose = (e) => {
        console.log("WebSocket Closed: ", e.code, e.reason);
        setMessage(`WebSocket Closed: ${e.code} -  ${e.reason}`);
      };
    } catch (error: any) {
      console.error(error);
      setMessage(`Erro-Geral: ${error.message}`);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>
          to see changes. Press
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>
          to open developer tools.
        </ThemedText>
      </ThemedView> */}

      {/* <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
       */}
      {/*        
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>
          directory. This will move the current
          <ThemedText type="defaultSemiBold">app</ThemedText> to
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 4: SignalR</ThemedText>
        <ThemedText>{message}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  stepContainer: { gap: 8, marginBottom: 8 },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
