import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarEle() {
  return (
    <>
      <div className="bg-black text-white new-deals-section">
        <p className="d-flex justify-content-center align-items-center m-0">
          New deals every week.{" "}
          <span className="px-2">
            <Link to="/hot-deals" className="hot-deals-link">
              hot deals
            </Link>
          </span>
        </p>
      </div>
      <Navbar bg="white" expand="lg" className="shadow-sm py-2">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold text-dark">
            ＬＵＥＶ
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/shop" className="mx-3">
                Shop Cars
              </Nav.Link>
              <NavDropdown
                title="Financing"
                id="nav-dropdown-finance"
                className="mx-3"
              >
                <NavDropdown.Item as={Link} to="/how-financing-works">
                  How Financing Works
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/car-calculator">
                  Car Loan Calculator
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="More" id="nav-dropdown-more" className="mx-3">
                <NavDropdown.Item as={Link} to="/about">
                  About Us
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/contact">
                  Contact Us
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Form className="d-flex align-items-center me-3">
              <Row className="gx-2">
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="expanding-search"
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    type="submit"
                    variant="outline-dark"
                    className="search-btn rounded-circle d-flex justify-content-center align-items-center custom-search-btn"
                    style={{ width: "40px", height: "40px", border: "none" }}
                  >
                    <i className="bi bi-search text-dark custom-search-icon"></i>
                  </Button>
                </Col>
              </Row>
            </Form>

            <Button
              variant="outline-secondary"
              className="rounded-pill px-4 py-2 fw-semibold login-btn"  as={Link} to="/login"
            >
              Login / Register
            </Button>
            <Button
              variant="outline-secondary"
              className="rounded-pill px-4 py-2 fw-semibold login-btn"
            >
              Admin 
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarEle;


