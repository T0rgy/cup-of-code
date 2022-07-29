import { Nav  } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Nav className="me-auto">
      <Nav.Link className="text-white" as={Link} to="/menu">
        MENU
      </Nav.Link>
      <Nav.Link className="text-white" as={Link} to="/about">
        ABOUT US
      </Nav.Link>
      <Nav.Link className="text-white" as={Link} to="/cart">
        CART
      </Nav.Link>
    <Nav.Link className="text-white" as={Link} to="/signin">
        SIGN IN
      </Nav.Link>
      <Nav.Link className="text-white" as={Link} to="/sign up">
        SIGN UP
      </Nav.Link>
    </Nav>
    // <h1>HI</h1>
  );
}

export default NavBar;
