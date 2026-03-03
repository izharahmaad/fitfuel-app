import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  profile: any;
  onBack?: () => void;
};

export default function DashboardScreen({ profile, onBack }: Props) {
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [dailyCalories, setDailyCalories] = useState(2000);
  const [statusText, setStatusText] = useState("");
  const [meals, setMeals] = useState<
    { id: string; name: string; cals: number; icon: string }[]
  >([]);

  // ✅ Safe calorie calculation
  useEffect(() => {
    if (!profile) return;

    const {
      age = 25,
      heightCm = 170,
      weightKg = 70,
      gender = "male",
      activity = "Moderately Active",
      goal = "Maintain",
    } = profile;

    let bmr =
      gender === "female"
        ? 10 * weightKg + 6.25 * heightCm - 5 * age - 161
        : 10 * weightKg + 6.25 * heightCm - 5 * age + 5;

    const activityLevels: Record<string, number> = {
      Sedentary: 1.2,
      "Lightly Active": 1.375,
      "Moderately Active": 1.55,
      "Very Active": 1.725,
    };

    const multiplier = activityLevels[activity] || 1.55;
    let maintenance = bmr * multiplier;

    if (goal === "Lose Weight") maintenance -= 400;
    if (goal === "Gain Muscle") maintenance += 400;

    const safeCalories = Math.max(maintenance, 1200);
    setDailyCalories(Math.round(safeCalories));
  }, [profile]);

  const addMeal = (name: string, icon: string, cals: number) => {
    setMeals([{ id: Date.now().toString(), name, cals, icon }, ...meals].slice(0, 5));
    setCaloriesConsumed((prev) => prev + cals);
  };

  const caloriesLeft = Math.max(dailyCalories - caloriesConsumed, 0);
  const progress = Math.min(caloriesConsumed / dailyCalories, 1);

  useEffect(() => {
    if (caloriesConsumed === 0) setStatusText("Let's start your day strong! 💪");
    else if (caloriesConsumed < dailyCalories * 0.6)
      setStatusText("Good pace! Keep fueling your body 🥗");
    else if (caloriesConsumed < dailyCalories)
      setStatusText("Almost there! Stay balanced 🔥");
    else setStatusText("Goal reached for today 🎯");
  }, [caloriesConsumed]);

  const progressColor =
    caloriesConsumed < dailyCalories * 0.9
      ? "#5efc82"
      : caloriesConsumed < dailyCalories
      ? "#ffd166"
      : "#ff6b6b";

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <LinearGradient
          colors={["#0b132b", "#1c2541", "#0b132b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.header}
        >
          {onBack && (
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
              <MaterialCommunityIcons name="arrow-left" size={22} color="#fff" />
            </TouchableOpacity>
          )}
          <MaterialCommunityIcons name="chart-donut" size={70} color="#ff6b6b" />
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>
            Your progress overview and daily calorie tracker.
          </Text>
        </LinearGradient>

        {/* Progress Circle */}
        <View style={styles.container}>
          <Progress.Circle
            size={160}
            progress={progress}
            showsText
            thickness={8}
            borderWidth={3}
            color={progressColor}
            formatText={() => `${Math.round(progress * 100)}%`}
          />
          <Text style={styles.calorieText}>
            {caloriesConsumed} / {dailyCalories} kcal
          </Text>
          <Text style={styles.statusText}>{statusText}</Text>

          {/* Quick Add Meals */}
          <Text style={styles.sectionTitle}>Quick Add Meals</Text>
          <View style={styles.row}>
            {[
              { name: "Breakfast", icon: "bread-slice", cals: 350 },
              { name: "Lunch", icon: "food", cals: 600 },
              { name: "Dinner", icon: "food-steak", cals: 700 },
              { name: "Snack", icon: "cookie", cals: 250 },
            ].map((m) => (
              <TouchableOpacity
                key={m.name}
                style={styles.mealButton}
                onPress={() => addMeal(m.name, m.icon, m.cals)}
              >
                <MaterialCommunityIcons name={m.icon as any} size={22} color="#0b132b" />
                <Text style={styles.mealText}>{m.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Meal Log */}
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          {meals.length === 0 ? (
            <Text style={styles.emptyText}>No meals logged yet. Add one above!</Text>
          ) : (
            meals.map((m) => (
              <View key={m.id} style={styles.mealLog}>
                <MaterialCommunityIcons
                  name={m.icon as any}
                  size={18}
                  color="#5efc82"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.mealLogText}>
                  {m.name}: {m.cals} kcal
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setMeals(meals.filter((x) => x.id !== m.id));
                    setCaloriesConsumed((prev) => Math.max(prev - m.cals, 0));
                  }}
                >
                  <FontAwesome5 name="times-circle" size={16} color="#ff6b6b" />
                </TouchableOpacity>
              </View>
            ))
          )}

          {/* Summary */}
          <View style={styles.summaryCard}>
            <MaterialCommunityIcons name="fire" size={26} color="#ffd166" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.summaryTitle}>Summary</Text>
              <Text style={styles.summaryText}>
                Remaining:{" "}
                <Text style={{ color: "#5efc82" }}>{caloriesLeft} kcal</Text>
              </Text>
              <Text style={styles.summaryText}>
                Goal:{" "}
                <Text style={{ color: "#ffd166" }}>{profile?.goal || "Maintain"}</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b132b" },
  scroll: { paddingBottom: 60 },
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
  },
  container: { padding: 20, alignItems: "center" },
  calorieText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginTop: 10,
  },
  statusText: {
    color: "#b5c9ff",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#b5c9ff",
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    marginVertical: 10,
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
  },
  mealButton: {
    backgroundColor: "#5efc82",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignItems: "center",
    margin: 6,
    width: 120,
  },
  mealText: {
    color: "#0b132b",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    marginTop: 4,
  },
  mealLog: {
    backgroundColor: "#1c2541",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginVertical: 4,
    width: "100%",
  },
  mealLogText: {
    color: "#fff",
    fontFamily: "Poppins_400Regular",
  },
  emptyText: {
    color: "#b5c9ff",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginVertical: 10,
  },
  summaryCard: {
    backgroundColor: "#1a1f3c",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    marginTop: 20,
    width: "100%",
  },
  summaryTitle: {
    color: "#ffd166",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
  },
  summaryText: {
    color: "#fff",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
});
