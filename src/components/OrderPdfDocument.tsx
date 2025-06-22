import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Assistant', // Use the registered Hebrew font
    direction: 'rtl'
  },
  section: {
    marginBottom: 10,
    textAlign: 'right'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'right'
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'right'
  },
  item: {
    fontSize: 12,
    marginBottom: 3,
    textAlign: 'right'
  },
  total: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right'
  }
});

const OrderPdfDocument = ({ order }: { order: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>אישור הזמנה</Text>
        <Text style={styles.subtitle}>מספר הזמנה: {order.orderNumber}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>פרטי לקוח:</Text>
        <Text style={styles.text}>שם: {order.name}</Text>
        <Text style={styles.text}>טלפון: {order.phone}</Text>
        <Text style={styles.text}>כתובת: {order.address}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>פירוט הזמנה:</Text>
        {order.cart.map((item: any, index: number) => (
          <Text key={index} style={styles.item}>
            • {item.name} (x{item.isByWeight ? `${item.weight} גרם` : item.quantity}) - {item.price.toFixed(2)}₪
          </Text>
        ))}
      </View>
      <Text style={styles.total}>סה"כ: {order.total.toFixed(2)}₪</Text>
    </Page>
  </Document>
);

export default OrderPdfDocument; 