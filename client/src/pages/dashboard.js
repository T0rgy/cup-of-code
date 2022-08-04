const Dashboard = () => {


    
    return (
        <div className='container-fluid bgimagehome'>
            
            <div className='container text-center'>
                <img className='homefeatureimg' src='../../images/rizky-subagja-IBhJivtPqHQ-unsplash.jpg'/>
                <h1 className="hometitle">CUP OF CODE</h1>
                <p className="hometitle">-_-_-_-_-_-_-_-</p>
                <div className='row homecard'>
                    <div className='col'>
                        <h2>FUEL YOUR MORNING</h2>
                    </div>
                    <div className='col'>
                        <img src='../../images/latte.jpeg' />
                    </div>  
                </div>
                <div className='row homecard'>
                    <div className='col'>
                        <img src='../../images/crepe-supreme.jpg' />
                    </div>
                    <div className='col'>
                        <h2>SATISFY A CRAVING</h2>
                    </div>     
                </div>
                <div className='row homecard'>
                    <div className='col'>
                        <h2>TREAT YOURSELF</h2>
                    </div>
                    <div className='col'>
                        <img src='../../images/doughnut.jpg' />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Dashboard;