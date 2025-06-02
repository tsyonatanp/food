'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

interface CartItem {
  id: number
  name: string
  weight: number
  pricePerGram: number
}

interface CartState {
  items: CartItem[]
  total: number
  deliveryFee: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_WEIGHT'; payload: { id: number; weight: number } }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: [],
  total: 0,
  deliveryFee: Number(process.env.DEFAULT_DELIVERY_FEE) || 20,
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.weight * item.pricePerGram), 0)
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id)
      let newItems: CartItem[]

      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) => 
          index === existingItemIndex
            ? { ...item, weight: item.weight + action.payload.weight }
            : item
        )
      } else {
        newItems = [...state.items, action.payload]
      }

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      }
    }

    case 'UPDATE_WEIGHT': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, weight: action.payload.weight }
          : item
      )
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      }
    }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateWeight: (id: number, weight: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateWeight = (id: number, weight: number) => {
    dispatch({ type: 'UPDATE_WEIGHT', payload: { id, weight } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateWeight,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 