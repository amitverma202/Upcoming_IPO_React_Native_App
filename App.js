import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "./src/components/Auth";
import Dashboard from "./src/components/Dashboard";
import ExchangeRate from "./src/components/ExchangeRate";

const Stack = createStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          options={{ headerShown: false }}
          component={() => <Auth onLogin={handleLogin} />}
        />
        {isLoggedIn && (
          <>
            <Stack.Screen
              name="Dashboard"
              options={{ title: "IPO's Dashboard" }}
              component={() => <Dashboard onLogout={handleLogout} />}
            />
            <Stack.Screen
              name="ExchangeRate"
              options={{ title: "Exchange Rates List" }}
              component={() => <ExchangeRate onLogout={handleLogout} />}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
