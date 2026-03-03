import React, { useState } from "react";
import StartScreen from "./src/screens/StartScreen";
import ProfileInfoScreen from "./src/screens/ProfileInfoScreen";
import ActivityGoalScreen from "./src/screens/ActivityGoalScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function App() {
  const [screen, setScreen] = useState<
    "start" | "profileInfo" | "activityGoal" | "dashboard"
  >("start");

  const [profileInfo, setProfileInfo] = useState<any>(null);
  const [finalProfile, setFinalProfile] = useState<any>(null);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  // === Start Screen ===
  if (screen === "start")
    return <StartScreen onStart={() => setScreen("profileInfo")} />;

  // === Profile Info ===
  if (screen === "profileInfo")
    return (
      <ProfileInfoScreen
        onNext={(data: any) => {
          setProfileInfo(data);
          setScreen("activityGoal");
        }}
      />
    );

  // === Activity & Goal ===
  if (screen === "activityGoal")
    return (
      <ActivityGoalScreen
        onBack={() => setScreen("profileInfo")}
        onNext={(data: any) => {
          // Merge earlier info + activity/goal
          const mergedProfile = { ...profileInfo, ...data };
          setFinalProfile(mergedProfile);
          setScreen("dashboard");
        }}
      />
    );

  // === Dashboard ===
  if (screen === "dashboard")
    return (
      <DashboardScreen
        profile={finalProfile}
        onBack={() => setScreen("activityGoal")}
      />
    );

  return null;
}
