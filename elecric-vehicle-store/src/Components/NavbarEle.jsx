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
      <div className="bg-black text-white">
        <p className="d-flex justify-content-center align-items-center m-0">
          New deals every day.{" "} 
          <span className="px-2">
            <Link to="../pages/HotDeals" className="text-white">
              <u>hot deals</u>
            </Link>
          </span>
        </p>
      </div>
      <Container>

      <Navbar bg="white" className="shadow-sm" data-bs-theme="light">
        
          <Nav.Link as={Link} to="/" className="fs-3 fw-bold text-dark">
            ＬＵＥＶ
          </Nav.Link>
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/Shop">
              Shop Cars
            </Nav.Link>
            <NavDropdown title="Financing" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="./HowFinancingWorks">
                How Financing works
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="./CarCalculator">
                Car loan Calculator
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="./About">
                About us
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="./Contact">
                Contact us
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex align-items-center">
            <Row className="gx-2">
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="me-2"
                  />
              </Col>
              <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
          <Button variant="success ms-3">Sign In / Register</Button>
        
      </Navbar>
                  </Container>
      </>

  );
}
export default NavbarEle;
