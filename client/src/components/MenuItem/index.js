import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

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
                id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        }   else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...item, purchaseQuantity: 1 }
            })
        }
    }

    return (
        <div className='card px-1 py-1'> 
            <Link to={`/menuItems/${_id}`}>
                <img
                    alt={name}
                    src={`/images/${image}`}
                    />
                    <p>{name}</p>
            </Link>
            <div>
                <div>{description}</div>
                <div>{ingredients}</div>
                <span>${price}</span>
            </div>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default MenuItem;