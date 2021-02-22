import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from './../media/logo.svg';
import './../css/index.css';

function TopNavbar (props){

        var userInfo = undefined;

        const logOut = async () => {
            console.log("Logging Out");
            await props.logOutUser();
            // Redirect to Home Page
            window.location.replace("/");
        }

        if(props.page !== 'home'){
            userInfo = <>
                        <Navbar.Text>
                            {props.name}
                        </Navbar.Text>
                        <Button variant="secondary" size="sm" onClick={logOut} className="leftPadded">
                            Log Out
                        </Button>
            </>
        }

        return (
            <div>
                <Navbar className="nav-color" variant="dark">
                    <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={logo}
                        width="35"
                        height="35"
                        className="d-inline-block align-top"
                    />
                    {' Linkbuk'}
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {userInfo}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
}

export default TopNavbar;