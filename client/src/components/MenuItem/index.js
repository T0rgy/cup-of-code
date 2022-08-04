import React from 'react';
import { Link } from 'react-router-dom';
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
                id: _id,
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
            <Link to={`/menuItems/${_id}`}>
                <img
                    className='menuItemImage rounded float-left img-thumbnail w-50'
                    alt={name}
                    src={`/images/${image}`}
                    />
                    <p className="text-uppercase font-weight-bold">{name}</p>
            </Link>
            <div className='text-left col-6'>
                <div className="font-weight-italic">{description}</div>
                <div className="">{ingredients}</div>
                <span className="font-weight-bold">${price}</span>
            </div>
            <button className="btn btn-primary mt-3" onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default MenuItem;