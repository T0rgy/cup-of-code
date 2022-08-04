import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function MenuItem(item) {
    const [state, dispatch] = useStoreContext();

    const {
        image,
        name, 
        _id,
        price,
        description,
        ingredients
    } = item;

    const { cart }  = state;

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id)
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        }   else {
            dispatch({
                type: ADD_TO_CART,
                menuItem: { ...item, purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { 
                ...item,
                purchaseQuantity: 1
            });
        }
    }

    return (
        <div className='menuItemCard col-5 p-4 m-3 border border-primary rounded'>
                <img
                    className='menuItemImage rounded float-center'
                    alt={name}
                    width="150px"
                    height="150px"
                    src={`/images/${image}`}
                />
                <h3 className="text-uppercase font-weight-bold">{name}</h3>
            <div className='text-left col-6'>
                <p className="description">{description}</p>
                <p className="ingredients">{ingredients}</p>
                <span className="price">${price}</span>
            </div>
            <button className="addBtn btn btn-primary mt-3" onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default MenuItem;