import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

export default function MainNavbar() {
    return (
    <div>
        <Navbar>
            <Container fluid>
            <Navbar.Brand style={{color: "white"}}>Calzlet</Navbar.Brand>
            </Container>
        </Navbar>
    </div>
    )
}