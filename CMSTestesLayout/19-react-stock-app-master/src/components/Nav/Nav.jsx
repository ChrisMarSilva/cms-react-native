import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

function Nav({isLoggedIn}) {
    return (
        <>
            <Navbar expand="lg" variant="dark" bg="dark">
                <Navbar.Brand href="/">React Stock Exchange APP</Navbar.Brand>
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text>
                        {isLoggedIn ? <a href="#logout">Logout</a> : <a href="#login">Sign In</a>}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Nav;

