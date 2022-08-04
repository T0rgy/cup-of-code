
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
                        <a href='https://www.facebook.com/' target='_blank' rel='noreferrer' title='Facebook'>
                            <i className="fa-3x fa-brands fa-inverse fa-facebook p-1"></i>
                        </a>
                        <a href='https://www.instagram.com/' target='_blank' rel='noreferrer' title='Instagram'>
                            <i className="fa-3x fa-brands fa-inverse fa-instagram p-1"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;