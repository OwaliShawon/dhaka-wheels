import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useParams } from 'react-router';
import { LoggedInUserContext } from '../../App';

const Header = () => {
    // const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
    // const [user, setUser] = useContext();
    // setUser(loggedInUser);
    // console.log(loggedInUser.name);
    // let { id } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
    return (
        <div style={{ marginBottom: '100px' }}>
            <Navbar bg="dark" variant="dark" fixed='top'>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                        React Bootstrap
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/destination">Destination</Nav.Link>
                    <Nav.Link href="/blog">Blog</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                    {
                        !loggedInUser.name ? <Nav.Link href="/login">Login</Nav.Link> :
                            <Nav.Link href="/">{loggedInUser.name}</Nav.Link>
                    }

                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;