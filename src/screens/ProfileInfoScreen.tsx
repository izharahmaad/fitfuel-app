import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileInfoScreen({ onNext }: { onNext: (data: any) => void }) {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | null>(null);
  const [isMetric, setIsMetric] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleUnits = () => setIsMetric((prev) => !prev);

  const handleNext = () => {
    if (!age || !height || !weight || !gender) {
      alert("Please fill in all fields!");
      return;
    }

    let heightCm = parseFloat(height);
    let weightKg = parseFloat(weight);

    if (!isMetric) {
      heightCm *= 30.48;
      weightKg *= 0.453592;
    }

    onNext({ age: +age, heightCm, weightKg, gender });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Elegant Gradient Header */}
        <LinearGradient
          colors={["#0b132b", "#1c2541", "#0b132b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.header}
        >
          <Ionicons name="flame-outline" size={70} color="#ff6b6b" />
          <Text style={styles.headerTitle}>Your Calorie Profile</Text>
          <Text style={styles.headerSubtitle}>
            We'll tailor your plan for smarter calorie tracking and balanced nutrition.
          </Text>
        </LinearGradient>

        {/* Fade-In Form */}
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
          <Text style={styles.sectionLabel}>Basic Details</Text>

          {/* Age */}
          <View style={styles.inputCard}>
            <Ionicons name="person-outline" size={22} color="#5efc82" />
            <TextInput
              style={styles.input}
              placeholder="Age (years)"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
          </View>

          {/* Height */}
          <View style={styles.inputCard}>
            <Ionicons name="body-outline" size={22} color="#5efc82" />
            <TextInput
              style={styles.input}
              placeholder={isMetric ? "Height (cm)" : "Height (ft)"}
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
            <TouchableOpacity onPress={toggleUnits}>
              <Text style={styles.toggle}>{isMetric ? "cm" : "ft"}</Text>
            </TouchableOpacity>
          </View>

          {/* Weight */}
          <View style={styles.inputCard}>
            <Ionicons name="nutrition-outline" size={22} color="#5efc82" />
            <TextInput
              style={styles.input}
              placeholder={isMetric ? "Weight (kg)" : "Weight (lb)"}
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            <TouchableOpacity onPress={toggleUnits}>
              <Text style={styles.toggle}>{isMetric ? "kg" : "lb"}</Text>
            </TouchableOpacity>
          </View>

          {/* Gender */}
          <Text style={styles.sectionLabel}>Select Your Gender</Text>
          <View style={styles.genderRow}>
            {[
              { label: "Male", icon: "male", key: "male" },
              { label: "Female", icon: "female", key: "female" },
              { label: "Other", icon: "person-circle", key: "other" },
            ].map((g) => (
              <TouchableOpacity
                key={g.key}
                style={[styles.genderPill, gender === g.key && styles.pillSelected]}
                onPress={() => setGender(g.key as any)}
              >
                <Ionicons
                  name={g.icon as any}
                  size={18}
                  color={gender === g.key ? "#0b132b" : "#fff"}
                />
                <Text
                  style={[
                    styles.pillText,
                    gender === g.key && { color: "#0b132b" },
                  ]}
                >
                  {g.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Feature Highlights */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureBox}>
              <Ionicons name="flame-outline" size={24} color="#ff6b6b" />
              <Text style={styles.featureText}>Track calories burned & consumed</Text>
            </View>
            <View style={styles.featureBox}>
              <Ionicons name="nutrition-outline" size={24} color="#5efc82" />
              <Text style={styles.featureText}>Customized nutrition balance</Text>
            </View>
            <View style={styles.featureBox}>
              <Ionicons name="stats-chart-outline" size={24} color="#ffd166" />
              <Text style={styles.featureText}>Progress analytics that adapt to you</Text>
            </View>
          </View>

          {/* Next Button */}
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
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
  headerTitle: {
    fontSize: 26,
    color: "#ff6b6b",
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

  formContainer: { padding: 20 },
  sectionLabel: {
    color: "#b5c9ff",
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    marginTop: 15,
    marginBottom: 8,
  },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c2541",
    borderRadius: 14,
    padding: 14,
    marginVertical: 6,
  },
  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  toggle: {
    color: "#5efc82",
    fontFamily: "Poppins_500Medium",
    marginLeft: 8,
  },

  genderRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  genderPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c2541",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 30,
    marginVertical: 6,
  },
  pillSelected: {
    backgroundColor: "#5efc82",
  },
  pillText: {
    color: "#fff",
    marginLeft: 6,
    fontFamily: "Poppins_500Medium",
  },

  featuresContainer: {
    marginTop: 25,
    backgroundColor: "#1a1f3c",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  featureBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  featureText: {
    color: "#dce7f7",
    marginLeft: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },

  nextBtn: { marginTop: 30 },
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
