import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { upcomingIpo } from "./IPO-api";
import { FontAwesome5 } from "@expo/vector-icons";

const Dashboard = ({ onLogout }) => {
  const [ipoDetails, setIpoDetails] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upcomingIpoData = await upcomingIpo();
        setIpoDetails(upcomingIpoData);
      } catch (error) {
        console.error("Error fetching upcoming IPO data:", error);
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

        <TouchableOpacity
          onPress={() => navigation.navigate("ExchangeRate")}
          style={styles.link}
        >
          <Text style={styles.linkText}>Exchange Rates</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <FontAwesome5 name="sign-out-alt" size={20} color="black" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.subtitle}>Upcoming IPO's Calendar</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>S.No.</Text>
            <Text style={styles.headerText}>Company name</Text>
            <Text style={styles.headerText}>Symbol</Text>
            <Text style={styles.headerText}>Filed Date</Text>
            <Text style={styles.headerText}>Offering Date</Text>
            <Text style={styles.headerText}>Shares</Text>
            <Text style={styles.headerText}>Volume</Text>
          </View>

          {ipoDetails.map((ipo, idx) => (
            <View
              key={`ipo_${ipo.symbol}_${ipo.offeringDate}`}
              style={[
                styles.tableRow,
                idx % 2 === 0 ? styles.evenRow : styles.oddRow,
              ]}
            >
              <Text style={styles.rowText}>{idx + 1}</Text>
              <Text style={styles.rowText}>{ipo.companyName}</Text>
              <Text style={styles.rowText}>{ipo.symbol}</Text>
              <Text style={styles.rowText}>{ipo.filedDate}</Text>
              <Text style={styles.rowText}>{ipo.offeringDate}</Text>
              <Text style={styles.rowText}>{ipo.shares}</Text>
              <Text style={styles.rowText}>{ipo.volume}</Text>
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
    color: "#3182ce",
    textDecorationLine: "underline",
    fontSize: 20,
    fontWeight: "bold",
    border: "1px solid #3182ce", 
  },
  linkText: {
    color: "black",
    textDecorationLine: "underline",
    marginLeft: 15,
    fontSize: 17,
    fontWeight: "bold",
    border: "1px solid #3182ce", 
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

export default Dashboard;
