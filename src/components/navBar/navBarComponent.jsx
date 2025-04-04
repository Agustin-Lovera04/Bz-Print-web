import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logoBZ from "/images/BZPrint-Logo.png";
import cartIMG from "/images/cartIMG.png";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { useContext, useRef } from "react";
import "./style-navBarComponent.css";

export function NavBar() {
  const { counterCart } = useContext(CartContext);
  const searchInputRef = useRef();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const valueSearch = searchInputRef.current.value.trim();

    if (valueSearch.length > 0) {
      navigate(`/?title=${valueSearch}`);
    } else {
      searchInputRef.current.value = "";
      navigate("/");
    }
  };

  return (
    <Navbar expand="lg" className="nav p-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={logoBZ} alt="BZPrint Logo" className="logoNavIMG" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className="d-flex flex-column container-fluid">

          <div className="d-flex flex-row ">

            <div className="d-flex flex-column mx-auto my-2 my-lg-0">
            <p className="warningSearch alert alert-warning p-1 m-1">Atencion! Intentá buscar con 3 letras coincidentes al menos, del objeto deseado. <br /> Ejem: Cartuchera = "CAN", Mochila = "MOC"</p>
          <Form className="d-flex mx-auto my-2 my-lg-0" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Busqueda por Titulo"
              className="me-2"
              aria-label="Search"
              ref={searchInputRef}
              />
            <Button variant="outline-light" type="submit" id="btnSearch">
              Buscar
            </Button>
          </Form>
              </div>
          <Nav className="ms-lg-auto">
            <Nav.Link
              as={Link}
              to="/cart"
              className="linkCounter d-flex align-items-center"
              >
              <div className="cart-container">
                <img src={cartIMG} alt="Carrito" className="cartIMG" />
                <p className="counterP text-end">{counterCart()}</p>
              </div>
            </Nav.Link>
          </Nav>
              </div>

              </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
