import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
} from "react-native";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function ActivityGoalScreen({
  onNext,
  onBack,
}: {
  onNext: (data: any) => void;
  onBack?: () => void;
}) {
  const [activity, setActivity] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const activityOptions = [
    { label: "Sedentary", desc: "Little to no exercise", icon: "couch" },
    { label: "Lightly Active", desc: "1–3 days/week exercise", icon: "walking" },
    { label: "Moderately Active", desc: "3–5 days/week exercise", icon: "biking" },
    { label: "Very Active", desc: "6–7 days/week training", icon: "dumbbell" },
  ];

  const goalOptions = [
    {
      label: "Lose",
      fullLabel: "Lose Weight",
      icon: "fire",
      color: "#ff4d6d",
      caption: "Burn fat",
    },
    {
      label: "Maintain",
      fullLabel: "Maintain",
      icon: "scale-balance",
      color: "#ffd166",
      caption: "Stay fit",
    },
    {
      label: "Gain",
      fullLabel: "Gain Muscle",
      icon: "arm-flex",
      color: "#5efc82",
      caption: "Build up",
    },
  ];

  const handleContinue = () => {
    if (!activity || !goal) {
      alert("Please select both your activity level and goal!");
      return;
    }
    onNext({ activity, goal });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={["#0b132b", "#1c2541", "#0b132b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.header}
        >
          {onBack && (
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>
          )}
          <MaterialCommunityIcons name="run" size={60} color="#5efc82" />
          <Text style={styles.headerTitle}>Activity & Goal</Text>
          <Text style={styles.headerSubtitle}>
            Choose how active you are and what you want to achieve.
          </Text>
        </LinearGradient>

        {/* Content */}
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Text style={styles.sectionLabel}>Activity Level</Text>
          {activityOptions.map((opt) => (
            <TouchableOpacity
              key={opt.label}
              style={[
                styles.optionCard,
                activity === opt.label && styles.optionSelected,
              ]}
              onPress={() => setActivity(opt.label)}
            >
              <FontAwesome5
                name={opt.icon as any}
                size={22}
                color={activity === opt.label ? "#0b132b" : "#5efc82"}
                style={{ marginRight: 12 }}
              />
              <View>
                <Text
                  style={[
                    styles.optionLabel,
                    activity === opt.label && { color: "#0b132b" },
                  ]}
                >
                  {opt.label}
                </Text>
                <Text
                  style={[
                    styles.optionDesc,
                    activity === opt.label && { color: "#0b132b" },
                  ]}
                >
                  {opt.desc}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* 🎯 Sleek Compact Goal Section */}
          <Text style={[styles.sectionLabel, { marginTop: 25 }]}>Your Fitness Goal</Text>
          <View style={styles.goalRow}>
            {goalOptions.map((g) => {
              const selected = goal === g.fullLabel;
              return (
                <TouchableOpacity
                  key={g.label}
                  onPress={() => setGoal(g.fullLabel)}
                  style={[
                    styles.goalCircle,
                    { borderColor: selected ? g.color : "rgba(255,255,255,0.1)" },
                    selected && { backgroundColor: g.color },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={g.icon as any}
                    size={26}
                    color={selected ? "#0b132b" : g.color}
                  />
                  <Text
                    style={[
                      styles.goalText,
                      selected && { color: "#0b132b", fontWeight: "700" },
                    ]}
                  >
                    {g.label}
                  </Text>
                  <Text
                    style={[
                      styles.goalCaption,
                      selected && { color: "#0b132b" },
                    ]}
                  >
                    {g.caption}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={handleContinue}>
            <LinearGradient
              colors={["#ff6b6b", "#fca311"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientBtn}
            >
              <Text style={styles.nextText}>Continue</Text>
              <Ionicons name="arrow-forward" size={18} color="#0b132b" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b132b" },
  header: {
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  backBtn: {
   position: "absolute",
   top: 25, 
   left: 15,
   zIndex: 10,
   backgroundColor: "rgba(255,255,255,0.1)",
   padding: 8,
   borderRadius: 50,
},
  headerTitle: {
    fontSize: 26,
    color: "#5efc82",
    fontFamily: "Poppins_700Bold",
    marginTop: 10,
    textAlign: "center",
  },
  headerSubtitle: {
    color: "#b5c9ff",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    width: "90%",
    lineHeight: 20,
  },
  content: { padding: 20 },
  sectionLabel: {
    color: "#b5c9ff",
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c2541",
    borderRadius: 16,
    padding: 14,
    marginVertical: 6,
  },
  optionSelected: { backgroundColor: "#5efc82" },
  optionLabel: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
  },
  optionDesc: {
    color: "#b5c9ff",
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
  },

  // 🎯 Final compact goal buttons
  goalRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  goalCircle: {
    width: 85,
    height: 85,
    borderRadius: 50,
    borderWidth: 1.8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c2541",
  },
  goalText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    marginTop: 4,
  },
  goalCaption: {
    color: "#b5c9ff",
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    marginTop: -2,
  },

  nextBtn: { marginTop: 35, marginBottom: 50 },
  gradientBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 40,
  },
  nextText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#0b132b",
    fontSize: 16,
    marginRight: 6,
  },
});
