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
                menuItem: { ...item, purchaseQuantity: 1 }
            })
        }
    }

    return (
        <div className='menuItemCard m-3 border border-primary rounded col-4'> 
            <Link to={`/menuItems/${_id}`}>
                <img
                    className='menuItemImage rounded float-center'
                    alt={name}
                    width="150px"
                    height="150px"
                    src={`/images/${image}`}
                    />
                    <p className="text-uppercase font-weight-bold">{name}</p>
            </Link>
            <div className='text-center'>
                <div className="font-weight-italic">{description}</div>
                <div className="">{ingredients}</div>
                <span className="font-weight-bold">${price}</span>
            </div>
            <button className="btn btn-group btn-primary position-relative bottom-center" onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default MenuItem;