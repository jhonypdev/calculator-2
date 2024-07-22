/** @format */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogoContainer from "./Logo";
import NavUser from "./NavUser";

const NavStore = () => {
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			className="bg-white shadow-sm rounded-[10px]">
			<Container fluid className="justify-between">
				<LogoContainer />
				<Navbar.Toggle
					aria-controls="responsive-navbar-nav"
					className="text-sm p-1"
				/>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ms-auto">
						{/* <Nav.Link href="#top">Inicio</Nav.Link>
						<Nav.Link href="#products">Shop</Nav.Link>
						<Nav.Link href="#footer">Contato</Nav.Link>
						<Nav.Link href="#deal">Promoção</Nav.Link> */}
					</Nav>
					<NavUser />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavStore;
