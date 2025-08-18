import { Telegraf } from 'telegraf'

interface OrderItem {
  name: string
  weight: number
  price: number
}

interface OrderDetails {
  orderId: string
  customerName: string
  phone: string
  address: string
  deliveryTime: string
  items: OrderItem[]
  total: number
  notes?: string
}

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || '')
const chatId = process.env.TELEGRAM_CHAT_ID || ''

export async function sendOrderNotification(order: OrderDetails) {
  try {
    const itemsList = order.items
      .map(item => `- ${item.name}: ${item.weight} גרם – ${item.price.toFixed(2)} ₪`)
      .join('\n')

    const message = `
הזמנה חדשה (#${order.orderId})
שם: ${order.customerName}
טלפון: ${order.phone}
כתובת: ${order.address}
זמן משלוח: ${order.deliveryTime}

פריטים:
${itemsList}

סה"כ: ${order.total.toFixed(2)} ₪
${order.notes ? `\nהערות: ${order.notes}` : ''}
`

    const keyboard = {
      inline_keyboard: [
        [
          { text: 'אשר הזמנה', callback_data: `approve_${order.orderId}` },
          { text: 'בטל הזמנה', callback_data: `cancel_${order.orderId}` }
        ]
      ]
    }

    await bot.telegram.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: keyboard
    })

    return true
  } catch (error) {
    console.error('Failed to send Telegram notification:', error)
    return false
  }
}

export async function updateOrderStatus(orderId: string, status: 'preparing' | 'delivering' | 'delivered') {
  try {
    const statusMessages = {
      preparing: '🔄 ההזמנה בהכנה',
      delivering: '🚚 ההזמנה במשלוח',
      delivered: '✅ ההזמנה נמסרה'
    }

    await bot.telegram.sendMessage(chatId, `
הזמנה #${orderId}
${statusMessages[status]}
`)

    return true
  } catch (error) {
    console.error('Failed to update order status:', error)
    return false
  }
} 