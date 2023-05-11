import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from '../src/screens/HomeScreen';
import ProductScreen from '../src/screens/ProductScreen';
import CartScreen from '../src/screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getError } from './utils';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { Store } from './Store';
import 'react-toastify/dist/ReactToastify.css';
import { Button, NavDropdown } from 'react-bootstrap';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/api/products/categories`
        );
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position="top-center" limit={1} />
        <header dir="rtl">
          <Navbar bg="success" variant="secondary" expand="lg">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>OvedStore</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto  w-100  justify-content-end">
                  {/* cart link */}
                  <Link to="/cart" className="nav-link">
                    עגלה
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {/* a = accumulator אוגר תוצאה אריתמטית (קשור לפעולות חשבון פשוטות - כפל,חילוק,חיבור,חיסור),  c = current item */}
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>

                  {/* user info ? if exists (show user name in haeder) if not exists  (show singin button) */}
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>פרופיל</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>הסטוריית הזמנות</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        התנתק
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      התחבר
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>קטגוריות</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main dir="rtl">
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">כל הזכויות שמורות לדניאל לוי</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
