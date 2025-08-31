'use client'

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'

type CartItem = {
  id: number
  name: string
  isByWeight: boolean
  // אם נמכר לפי משקל
  weight?: number
  pricePerGram?: number
  // אם נמכר לפי יחידות
  quantity?: number
  price?: number
  averageWeightPerUnit?: number // משקל ממוצע ליחידה
  estimatedUnitPrice?: number // מחיר ליחידה משוער
  area?: string // הוספת עמודת אזור
  notes?: string // הערות לבחירות (לפריטי קייטרינג)
}

type CartState = {
  items: CartItem[]
  total: number
  deliveryFee: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_WEIGHT'; payload: { id: number; weight: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState }

const initialState: CartState = {
  items: [],
  total: 0,
  deliveryFee: 30
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        // אם הפריט כבר קיים, נעדכן את הכמות או המשקל
        const updatedItems = state.items.map(item => {
          if (item.id === action.payload.id) {
            if (item.isByWeight) {
              return {
                ...item,
                weight: (item.weight || 0) + (action.payload.weight || 0)
              }
            } else {
              return {
                ...item,
                quantity: (item.quantity || 0) + (action.payload.quantity || 0)
              }
            }
          }
          return item
        })
        
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        }
      }
      
      // אם הפריט חדש, נוסיף אותו לעגלה
      const newItems = [...state.items, action.payload]
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems)
      }
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems)
      }
    }
    
    case 'UPDATE_WEIGHT': {
      const newItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, weight: action.payload.weight }
        }
        return item
      })
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems)
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity }
        }
        return item
      })
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems)
      }
    }
    
    case 'CLEAR_CART':
      return initialState
      
    case 'LOAD_CART':
      return action.payload
      
    default:
      return state
  }
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    if (item.isByWeight) {
      return total + (item.weight || 0) * (item.pricePerGram || 0)
    } else {
      // השתמש במחיר משוער אם קיים
      return total + (item.quantity || 0) * (item.estimatedUnitPrice ?? item.price ?? 0)
    }
  }, 0)
}

// פונקציה לטעינת העגלה מ-localStorage
function loadCartFromStorage(): CartState {
  if (typeof window === 'undefined') {
    return initialState
  }
  
  try {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      // וודא שהמבנה תקין
      if (parsedCart && typeof parsedCart === 'object') {
        return {
          items: Array.isArray(parsedCart.items) ? parsedCart.items : [],
          total: typeof parsedCart.total === 'number' ? parsedCart.total : 0,
          deliveryFee: typeof parsedCart.deliveryFee === 'number' ? parsedCart.deliveryFee : 30
        }
      }
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
  }
  
  return initialState
}

// פונקציה לשמירת העגלה ב-localStorage
function saveCartToStorage(cart: CartState) {
  if (typeof window === 'undefined') {
    return
  }
  
  try {
    localStorage.setItem('cart', JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

const CartContext = createContext<{
  state: CartState
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateWeight: (id: number, weight: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
} | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState) // Start with initial empty state
  
  // Load cart from storage only on the client-side after initial render
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart.items.length > 0 || savedCart.total > 0) {
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Save cart to storage whenever it changes
  useEffect(() => {
    // Avoid overwriting the initial empty state with an empty cart from storage
    if (state !== initialState) {
      saveCartToStorage(state)
    }
  }, [state])
  
  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }
  
  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }
  
  const updateWeight = (id: number, weight: number) => {
    dispatch({ type: 'UPDATE_WEIGHT', payload: { id, weight } })
  }
  
  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  
  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateWeight, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 