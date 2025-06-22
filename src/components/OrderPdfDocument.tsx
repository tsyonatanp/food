import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica', // Using a standard font for now
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  item: {
    fontSize: 12,
    marginBottom: 3,
  },
  total: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  }
});

const OrderPdfDocument = ({ order }: { order: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Order Confirmation</Text>
        <Text style={styles.subtitle}>Order Number: {order.orderNumber}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Customer Details:</Text>
        <Text style={styles.text}>Name: {order.name}</Text>
        <Text style={styles.text}>Phone: {order.phone}</Text>
        <Text style={styles.text}>Address: {order.address}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Order Details:</Text>
        {order.cart.map((item: any, index: number) => (
          <Text key={index} style={styles.item}>
            - {item.name} (x{item.isByWeight ? `${item.weight}g` : item.quantity}) - ${item.price.toFixed(2)}
          </Text>
        ))}
      </View>
      <Text style={styles.total}>Total: ${order.total.toFixed(2)}</Text>
    </Page>
  </Document>
);

export default OrderPdfDocument; 