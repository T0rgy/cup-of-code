const Dashboard = () => {


    
    return (
        <div className='container-fluid bgimagehome'>
            
            <div className='container text-center'>
                <img className='homefeatureimg' src='../../images/rizky-subagja-IBhJivtPqHQ-unsplash.jpg' alt='coffee and a laptop' />
                <h1 className="hometitle">CUP OF CODE</h1>
                <p className="hometitle">-_-_-_-_-_-_-_-</p>
                <div className='row homecard'>
                    <div className='col'>
                        <h2>FUEL YOUR MORNING</h2>
                    </div>
                    <div className='col'>
                        <img src='../../images/latte.jpeg' alt='a latte' />
                    </div>  
                </div>
                <div className='row homecard'>
                    <div className='col'>
                        <img src='../../images/crepe-supreme.jpg' alt='a crepe' />
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
                        <img src='../../images/doughnut.jpg' alt='a stack of doughnuts' />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Dashboard;