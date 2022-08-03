import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_ORDER } from '../utils/queries';
import Auth from '../utils/auth';

const Dashboard = () => {
    const navigate = useNavigate();

    // check for a logged in user
    const currentUser = Auth.loggedIn()
    // if no logged in user, redirect to login page
    if (!currentUser) {
        navigate('/about');
    }

    const { loading, error, data } = useQuery(GET_USER, {
        variables: {
            _id: currentUser?.data?._id
        }
    });
    


    if (loading) return 'Loading...';
    if (error) return `Error: ${error.message}`;

    const user = data?.user;
    if (!user) {
        return 'No user found';
    }

    

    
    return (
        <div>
            <h1>Welcome, {user.username}</h1>
            <p>{user.email}</p>
            <h2>Order History:</h2>
            {user.orders.map((order) => (
                <div key={order._id} className='my-2'>
                    <h3>
                        {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                    </h3>
                    <div className='flex-row'>
                        {order.menuItems.map(({  image, name, price }, index) => (
                            <div key={index} className='car px-1 py-1'>
                                <img alt={name} src={`/images/${image}`} />
                                <p>{name}</p>
                                <span>${price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Dashboard;