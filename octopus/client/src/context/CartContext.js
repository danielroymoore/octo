import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = [];


function reducer(state, action) {
    switch (action.type) {
      case 'INCREASE_PRODUCT': {
          const newState = [...state]
          newState.find(product => product.id === action.payload.id).quantity += 1
          return newState
      }
      case 'DECREASE_PRODUCT': {
          const newState = [...state]
          const productIndex = newState.findIndex(product => product.id === action.payload.id);
           
          if(newState[productIndex].quantity === 1) {
            return newState.filter(product => product.id !== action.payload.id)
          }

          newState[productIndex].quantity = newState[productIndex].quantity -= 1

          return newState
      }
      case 'ADD_PRODUCT_TO_CART': {
        const newState = [...state]
        const productIndex = newState.findIndex(product => product.id === action.payload.id);
        if(productIndex > -1) {
            newState[productIndex].quantity = action.payload.quantity
        } else {
            newState.push({...action.payload})
        }
        return newState
      }
      case 'REMOVE_PRODUCT_FROM_CERT': {
          const newState = [...state]
          return newState.filter(product => product.id !== action.payload.id)
      }
      default:
        return [];
    }
  }

const CartContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const increaseProductQty = payload => {
        dispatch({type: 'INCREASE_PRODUCT', payload})
    }

    const decreaseProductQty = payload => {
        dispatch({type: 'DECREASE_PRODUCT', payload})
    }

    const addToCart = payload => {
        dispatch({type: "ADD_PRODUCT_TO_CART", payload});
    }

    const removeFromCart = payload => {
        dispatch({type: "REMOVE_PRODUCT_FROM_CART", payload})
    }

    return (
        <CartContext.Provider value={{products: state, increaseProductQty, decreaseProductQty, addToCart, removeFromCart}}>
            { children }
        </CartContext.Provider>
    )
}

export default CartContextProvider