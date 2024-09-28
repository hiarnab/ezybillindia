import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import logo1 from "../assets/homepage/logo3.png";

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  logoContainer: {
    textAlign: "left",
    width: "150px"
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    paddingBottom: "15px",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
  },
});

// Create PDF document
const TransactionPdf = ({ data }) => {
//   if (!paymentDetails || !paymentDetails.notes || typeof paymentDetails.notes.days === "undefined") {
//     return (
//       <Document>
//         <Page style={styles.page}>
//           <Text style={styles.text}>Loading...</Text>
//         </Page>
//       </Document>
//     );
//   }

  const parsedJson = JSON.parse(data.json_response);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.logoContainer}>
          <Image src={logo1} style={styles.logo} />
        </View>
        <Text style={styles.header}>Payment Details</Text>
        <View style={styles.row}>
          <Text style={styles.text}>Date:</Text>
          <Text style={styles.text}>{data.created_at}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Payment ID:</Text>
          <Text style={styles.text}>{data.gateway_txn || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Property Name:</Text>
          <Text style={styles.text}>{data.PropName || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Customer Name:</Text>
          <Text style={styles.text}>{data.CustomerName || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Order ID:</Text>
          <Text style={styles.text}>{data.transaction_no || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Package Type:</Text>
          <Text style={styles.text}>
            {parsedJson.notes.days == "30" ? "Monthly" :
              parsedJson.notes.days == "90" ? "Quarterly" :
                parsedJson.notes.days == "180" ? "Half-Yearly" :
                  parsedJson.notes.days == "365" ? "Yearly" :
                    "Unknown"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Amount:</Text>
          <Text style={styles.text}>
            {data.amount} {parsedJson.currency}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Status:</Text>
          <Text style={styles.text}>
            {data.status === "captured" ? "Successful" :
              data.status === "failed" ? "Failed" :
                data.status === "pending" ? "Pending" : "Unknown"}
          </Text>
        </View>
        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );
};

export default TransactionPdf;