import { Image, StyleSheet, Platform } from "react-native";
import axios from "axios";
import { useEffect } from "react";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const fetchDataByFetch = async () => {
  fetch("http://192.168.1.107:3002/chave/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => console.log(response))
    // .then((response) => response.json())
    // .then((data) => console.log(data))
    .catch((error) => console.error("Error fetch:", error));
};

const fetchDataByAxios = async () => {
  try {
    // axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
    //axios.defaults.headers.get["Content-Type"] = "application/json";
    const response = await axios.get("http://192.168.1.107:3002/chave/", {
      crossdomain: true,
      timeout: 1000 * 30,
      withCredentials: false,
      accesscontrolalloworigin: "*",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json; charset=utf-8", //  "application/x-www-form-urlencoded",
        "Access-Control-Allow-Credentials": "false",
        "Access-Control-Allow-Methods":
          "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Origin": "", // "http://localhost:3002", // "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "",
        "Access-Control-Expose-Headers": "*",
        Accept: "application/json",
        mode: "no-cors",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error axios:", error);
  }
};

export default function HomeScreen() {
  useEffect(() => {
    fetchDataByFetch();
    fetchDataByAxios();
  }, []);

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
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
