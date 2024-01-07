import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { exchangeIpo } from "./IPO-api";
import { FontAwesome5 } from "@expo/vector-icons";

const ExchangeRate = ({ onLogout }) => {
  const [exchangeIpoDetails, setExchangeIpoDetails] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exchangeIpoData = await exchangeIpo();
        setExchangeIpoDetails(exchangeIpoData);
      } catch (error) {
        console.error("Error fetching exchange IPO data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    onLogout();
    navigation.navigate("Auth");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.title}>IPO's Dashboard</Text> */}
        
        <TouchableOpacity
          onPress={() => navigation.navigate("Dashboard")}
          style={styles.link}
        >
          <FontAwesome5 name="home" size={20} color="black" />
          {/* <Text style={styles.linkText}>Home</Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Dashboard")}
          style={styles.link}
        >
          <Text style={styles.linkText}>Upcoming IPO's Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <FontAwesome5 name="sign-out-alt" size={20} color="black" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.subtitle}>Latest Exchange Rate List</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>S.No.</Text>
            <Text style={styles.headerText}>Symbol</Text>
            <Text style={styles.headerText}>Rate</Text>
            <Text style={styles.headerText}>Time Stamp</Text>
          </View>

          {exchangeIpoDetails.map((excRate, idx) => (
            <View
              key={`exchange_${excRate.symbol}`}
              style={[
                styles.tableRow,
                idx % 2 === 0 ? styles.evenRow : styles.oddRow,
              ]}
            >
              <Text style={styles.rowText}>{idx + 1}</Text>
              <Text style={styles.rowText}>{excRate.symbol}</Text>
              <Text style={styles.rowText}>{excRate.rate}</Text>
              <Text style={styles.rowText}>
                {new Date(excRate.timestamp).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fafc",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    color: "black",
    textDecorationLine: "underline",
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: "black",
    marginLeft: 5,
  },
  scrollView: {
    flex: 1,
    marginTop : "50"
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 5,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#edf2f7",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  oddRow: {
    backgroundColor: "#f7fafc",
  },
  evenRow: {
    backgroundColor: "#edf2f7",
  },
  rowText: {
    flex: 1,
  },
});

export default ExchangeRate;
