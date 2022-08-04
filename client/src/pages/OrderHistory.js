import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import Auth from '../utils/auth';

const OrderHistory = () => {

    const currentUser = Auth.loggedIn()
    const { data } = useQuery(GET_USER,  {
        variables: {
            _id: currentUser?.data?._id
        }
    });

    let user;

    if (data) {
        user = data.user;
    };

    function calculateTotal(order) {
        let sum=0;
        const menuItems = order.menuItems;
        console.log("This one ", menuItems);

        menuItems.forEach((menuItem) => {
            sum += menuItem.price;
        });
        return sum.toFixed(2);
    };

    

    return (
      <>
        <div className='container'>
            <Link to='/menu'>← Back to the Menu</Link>
            {user ? (
                <>
                    <h2>
                        Order History for {user.username} 
                    </h2>
                    {user.orders.map((order) => (
                        <div key={order._id} className='order'>
                            <h3>
                                {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                            </h3>
                            <div className='card'>
                                {order.menuItems.map(({ name, price }, index) => (
                                    <ul key={index} className=''>
                                        <li>{name}</li>
                                        <span>${price}</span>
                                    </ul>
                                ))}
                                                                                        
                               
                            </div>
                            <strong>Total: ${calculateTotal(order)}</strong>
                            <button className='btn btn-primary mt-3'>Cancel Order</button>         
                        </div>
                    ))}
                </>
            ) : null}
        </div>
      </>
    );
};

export default OrderHistory