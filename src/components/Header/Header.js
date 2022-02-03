import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
// import { useParams } from 'react-router';
import { LoggedInUserContext } from '../../App';
import "./Header.css";

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
                    Dhaka Wheels
                </Navbar.Brand>
                <Nav className="ml-auto links">
                    <Nav.Link className='text-success' href="/home">Home</Nav.Link>
                    <Nav.Link className='text-success' href="/destination">Destination</Nav.Link>
                    <Nav.Link className='text-success' href="/blog">Blog</Nav.Link>
                    <Nav.Link className='text-success' href="/contact">Contact</Nav.Link>
                    {
                        !loggedInUser.name ? <Nav.Link className='text-info' href="/login">Login</Nav.Link> :
                            <Nav.Link className='text-info' href="">{loggedInUser.name}</Nav.Link>
                    }
                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;