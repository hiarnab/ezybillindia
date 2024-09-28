// PaymentDetailsPDF.js
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
const PaymentPdf = ({ paymentDetails, responseData, currentDateTimeFormatted1 }) => {
  if (!paymentDetails || !paymentDetails.notes || typeof paymentDetails.notes.days === "undefined") {
    return (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.text}>Loading...</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.logoContainer}>
          <Image src={logo1} style={styles.logo} />
        </View>
        <Text style={styles.header}>Payment Details</Text>
        <View style={styles.row}>
          <Text style={styles.text}>Date:</Text>
          <Text style={styles.text}>{currentDateTimeFormatted1}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Payment ID:</Text>
          <Text style={styles.text}>{responseData.razorpay_payment_id || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Property Name:</Text>
          <Text style={styles.text}>{paymentDetails.notes.propertyName || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Customer Name:</Text>
          <Text style={styles.text}>{paymentDetails.notes.cusName || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Order ID:</Text>
          <Text style={styles.text}>{responseData.razorpay_order_id || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Package Type:</Text>
          <Text style={styles.text}>
            {paymentDetails.notes.days == "30" ? "Monthly" :
              paymentDetails.notes.days == "90" ? "Quarterly" :
                paymentDetails.notes.days == "180" ? "Half-Yearly" :
                  paymentDetails.notes.days == "365" ? "Yearly" :
                    "Unknown"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Amount:</Text>
          <Text style={styles.text}>
            {paymentDetails.amount / 100} {paymentDetails.currency}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Status:</Text>
          <Text style={styles.text}>
            {paymentDetails.status === "captured" ? "Successful" :
              paymentDetails.status === "failed" ? "Failed" :
                paymentDetails.status === "pending" ? "Pending" : "Unknown"}
          </Text>
        </View>
        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );
};

export default PaymentPdf;
