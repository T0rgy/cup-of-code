import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_ORDER } from '../utils/queries';
import Auth from '../utils/auth';

const Dashboard = () => {
    const navigate = useNavigate();


    
    return (
        <div className='container bgimagehome'>

            <div className='container'>
                <h1>Cup of Code</h1>
            </div>
        </div>
    )
}

export default Dashboard;