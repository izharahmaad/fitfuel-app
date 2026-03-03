🔥 FitFuel – Smart Calorie Tracking Mobile Application
📱 Overview

FitFuel is a React Native–based intelligent calorie tracking application designed to provide personalized daily calorie recommendations using scientifically validated metabolic formulas.

The system dynamically calculates calorie requirements based on user profile data (age, height, weight, gender, activity level) and adjusts recommendations according to fitness goals such as weight loss, maintenance, or muscle gain.

🎯 Objectives

Provide accurate daily calorie recommendations

Personalize nutrition plans using scientific equations

Track daily calorie intake and progress

Offer a clean, modern, and interactive mobile experience

🧮 Scientific Calculation Method
1️⃣ Basal Metabolic Rate (BMR)

The system uses the Mifflin-St Jeor Equation:

For Males:

BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age + 5

For Females:

BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age − 161
2️⃣ Total Daily Energy Expenditure (TDEE)
TDEE = BMR × Activity Multiplier

Activity Multipliers:

Sedentary → 1.2

Lightly Active → 1.375

Moderately Active → 1.55

Very Active → 1.725

3️⃣ Goal-Based Adjustment

Lose Weight → −400 kcal

Maintain → No change

Gain Muscle → +400 kcal

The system ensures a safe minimum calorie threshold.

🚀 Features

🔥 Personalized calorie calculation

📊 Real-time progress tracking

🍽 Quick meal logging system

📈 Dynamic circular progress visualization

🎯 Goal-based calorie adjustment

🎨 Modern UI with animations

📱 Fully responsive mobile design

🏗 Technology Stack

React Native

Expo

TypeScript

React Hooks (useState, useEffect)

Animated API

Expo Linear Gradient

react-native-progress

📂 Application Architecture
screens/
   ├── StartScreen
   ├── ProfileInfoScreen
   ├── ActivityGoalScreen
   └── DashboardScreen

assets/
components/
utils/
🖥 Installation & Setup

Clone the repository:

git clone https://github.com/izharahmaad/fitfuel-app.git

Navigate into project folder:

cd fitfuel-app

Install dependencies:

npm install

Start development server:

npx expo start
📈 Future Enhancements

Backend API integration

AI-based meal recognition

Nutrition database integration

Cloud synchronization

Wearable device support

User authentication system

🎓 Academic Value

This project demonstrates:

Implementation of validated metabolic equations

Personalized algorithm design

State management in React Native

Goal-based logical computation

Mobile UI/UX engineering

Health-focused application development

👨‍💻 Developer

Izhar Ahmad
