import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
function NavbarEle() {
  return (
    <>
      <Navbar bg="white" className="shadow-sm" data-bs-theme="light">
        <Container>
          <Nav.Link as={Link} to="/" className="fs-3 fw-bold text-dark">
            ＬＵＥＶ
          </Nav.Link>
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/Shop">
              Shop Cars
            </Nav.Link>
            <NavDropdown title="Financing" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="./HowFinancingWorks">How Financing works</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="./CarCalculator">Car loan Calculator</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="./About">About us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="./Contact">Contact us</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default NavbarEle;


