import { Navbar, Container, Nav, NavDropdown, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Shop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">
              <Nav.Link href="/cart">
                {cartItems.length > 0 && (
                  <Badge bg="danger" pill text="light">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Badge>
                )}
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i className="fa-solid fa-user-plus"></i> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
