import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function StartScreen({ onStart }: { onStart: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../../assets/bg-fitness.jpg")}  
        resizeMode="cover"
        style={styles.bg}
        imageStyle={{ opacity: 0.28 }}
      >
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.logoContainer,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <LinearGradient
              colors={["#ff6b35", "#fca311"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoGlow}
            >
              <MaterialCommunityIcons
                name="fire-circle"
                size={55}
                color="#0b132b"
                style={styles.burnIcon}
              />
            </LinearGradient>
          </Animated.View>

          {/* === Title === */}
          <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
            FitFuel
          </Animated.Text>

          <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
            Burn Smart. Eat Right. Stay Strong.
          </Animated.Text>

          {/* === Tagline === */}
          <Animated.Text style={[styles.quote, { opacity: fadeAnim }]}>
            “Every calorie counts — track it, own it, master it.”{"\n"}Let’s ignite your journey.
          </Animated.Text>

          {/* === CTA Button === */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <TouchableOpacity onPress={onStart}>
              <LinearGradient
                colors={["#ff6b35", "#fca311"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Get Started</Text>
                <FontAwesome5
                  name="arrow-right"
                  size={16}
                  color="#0b132b"
                  style={{ marginLeft: 6 }}
                />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* === Footer === */}
          <Text style={styles.footer}>Track • Burn • Progress</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b132b" },
  bg: { flex: 1 },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "rgba(11,19,43,0.75)",
  },

  // 🔥 Logo Area
  logoContainer: { alignItems: "center", marginBottom: 20 },
  logoGlow: {
    width: 90,
    height: 90,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ff6b35",
    shadowOpacity: 0.45,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    backgroundColor: "rgba(255,107,53,0.12)",
  },
  burnIcon: {
    shadowColor: "#fca311",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  // Text
  title: {
    fontSize: 40,
    color: "#5efc82",
    fontFamily: "Poppins_700Bold",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 17,
    color: "#b5c9ff",
    fontFamily: "Poppins_500Medium",
    marginBottom: 25,
    textAlign: "center",
  },
  quote: {
    fontSize: 13,
    color: "#d0d7e8",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },

  // Button
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    paddingHorizontal: 38,
    borderRadius: 35,
  },
  buttonText: {
    fontSize: 18,
    color: "#0b132b",
    fontFamily: "Poppins_600SemiBold",
  },

  // Footer
  footer: {
    fontSize: 13,
    color: "rgba(181,201,255,0.8)",
    fontFamily: "Poppins_400Regular",
    position: "absolute",
    bottom: 40,
    textAlign: "center",
  },
});
