import React from 'react';

// This component uses standard HTML and Tailwind CSS classes.
// @vercel/og will convert this to an image.
export const OrderImage = ({ order }: { order: any }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      padding: '40px',
      fontFamily: '"Inter", sans-serif',
      direction: 'rtl',
      textAlign: 'right',
    }}
  >
    <h1 style={{ fontSize: '40px', marginBottom: '20px', width: '100%', textAlign: 'center' }}>
      אישור הזמנה
    </h1>
    <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>
      מספר הזמנה: {order.orderNumber}
    </h2>
    
    <div style={{ borderTop: '2px solid #eaeaea', width: '100%', paddingTop: '20px' }}>
      <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>פרטי לקוח:</h3>
      <p style={{ fontSize: '20px' }}>שם: {order.name}</p>
      <p style={{ fontSize: '20px' }}>טלפון: {order.phone}</p>
      <p style={{ fontSize: '20px', marginBottom: '20px' }}>כתובת: {order.address}</p>
    </div>

    <div style={{ borderTop: '2px solid #eaeaea', width: '100%', paddingTop: '20px' }}>
      <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>פירוט הזמנה:</h3>
      {order.cart.map((item: any, index: number) => (
        <p key={index} style={{ fontSize: '20px' }}>
          • {item.name} (x{item.isByWeight ? `${item.weight} גרם` : item.quantity}) - {item.price.toFixed(2)}₪
        </p>
      ))}
    </div>
    
    <p style={{ marginTop: '30px', fontSize: '28px', fontWeight: 'bold' }}>
      סה"כ: {order.total.toFixed(2)}₪
    </p>
  </div>
); 