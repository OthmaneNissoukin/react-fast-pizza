import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        pizzaAdded(state, action) {
            state.push(action.payload)
        },

        pizzaIncremented(state, action) {
            return state.map(pizza => pizza.pizzaId === action.payload ? {...pizza, quantity: pizza.quantity + 1, totalPrice: pizza.totalPrice + pizza.unitPrice} : pizza )
        },

        pizzaDecremented(state, action) {
            return state.map(pizza => pizza.pizzaId === action.payload ? {...pizza, quantity: pizza.quantity - 1, totalPrice: pizza.totalPrice - pizza.unitPrice} : pizza ).filter(pizza => pizza.quantity !== 0)
        },

        pizzaDeleted(state, action) {
            return state.filter(pizza => pizza.pizzaId !== action.payload)
        },

        pizzaCleared() {
            return []
        }
    }
})

export const getTotalCartPrice = state => state.cart.reduce((curr, next) => curr + next.totalPrice, 0)

export const getTotalCartItems = state => state.cart.length

export default cartSlice.reducer
export const {pizzaAdded, pizzaIncremented, pizzaDecremented, pizzaDeleted, pizzaCleared} = cartSlice.actions