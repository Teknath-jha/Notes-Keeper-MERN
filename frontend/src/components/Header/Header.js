import {
  Nav,
  NavDropdown,
  FormControl,
  Form,
  Navbar,
  Container,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <Link to="/">Note Keeper</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-nabar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Form>
          </Nav>

          <Nav>
            <Nav.Link>
              <Link to="/mynotes">My Notes</Link>
            </Nav.Link>
            <NavDropdown title="Teknath Jha" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">MyProfile</NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  navigate("/");
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
