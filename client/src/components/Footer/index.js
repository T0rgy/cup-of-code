
function Footer() {
    return (
        <footer>
            <div className="container-fluid">
                <div className="row justify-content-between align-items-center w-100">
                    <div className="col-3">
                        <h4 className="text-start">Location</h4>
                        <p className="text-start">1234 Mern Rd</p>
                        <p className="text-start">Fullstack WI 44444</p>
                    </div>
                    <div className="col-3">
                        <h4>Hours</h4> 
                        <p>Mon-Fri: 6AM-2PM</p> 
                        <p>Sat-Sun: 6AM-4PM</p>
                    </div>
                    <div className="col-3 text-end align-middle">
                        <a href='' target='_blank' title='Facebook'>
                            <i className="fa-3x fa-brands fa-inverse fa-facebook p-1"></i>
                        </a>
                        <a href='' target='_blank' title='Instagram'>
                            <i className="fa-3x fa-brands fa-inverse fa-instagram p-1"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;