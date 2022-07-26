import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import Auth from '../utils/auth';

const Dashboard = () => {
    const navigate = useNavigate();

    // check for a logged in user
    const currentUser = Auth.loggedIn()
    // if no logged in user, redirect to login page
    if (!currentUser) {
        navigate('/login');
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
            <button onClick={Auth.logout}>Logout</button>
        </div>
    )
}

export default Dashboard;