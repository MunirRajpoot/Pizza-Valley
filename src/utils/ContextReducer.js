import { act, createContext, useMemo, useReducer } from "react";


const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, {
                id: action.id,
                tempId: action.tempId,
                name: action.name,
                price: action.price,
                qty: action.qty,
                size: action.priceOptions,
                img: action.img
            }]
        case "UPDATE":
            let arr = [...state];
            arr.find((food, index) => {
                if (food.tempId === action.tempId) {
                    arr[index] = { ...food, qty: parseInt(action.qty) + parseInt(food.qty), price: action.price + food.price }
                }
            })
            return arr;
        default:
            console.log("Action Type...");

    }
}
export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, []);

    const contextValue = useMemo(() => {
        return { state, dispatch }
    }, [state, dispatch])

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

