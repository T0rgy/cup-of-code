import { useReducer } from 'react';
import {
    ADD_MULTIPLE_TO_CART,
    ADD_TO_CART,
    CLEAR_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    UPDATE_MENUITEMS
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_MENUITEMS:
            return {
                ...state,
                products: [...action.products]
            };

        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };
        
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };

        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.menuItem]
            };

        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, ...action.menuItems]
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(menuItem => {
                    if (action._id === menuItem._id) {
                        menuItem.purchaseQuantity = action.purchaseQuantity
                    }
                    return menuItem
                })
            };

        case REMOVE_FROM_CART:
            let newState = state.cart.filter(menuItem => {
                return menuItem._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };

        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };

        default:
            return state;
    }
};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
};