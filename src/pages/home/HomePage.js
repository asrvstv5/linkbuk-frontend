import React from 'react';
import LoginForm from './LoginForm';
import TopNavBar from './../../components/navBar';
import { connect } from 'react-redux';
import logo from './../../media/logo.png';

function HomePage(props) {
        if(props.name && props.token && props.email){
            window.location.replace("/dashboard");
            return null;
        }
        return (
            <div className="Page">
                <div className="NavBar">
                    <TopNavBar page='home'/>
                </div>
                <div className="centerAlign">
                    <div className="LoginForm">
                        <img src={logo} alt=""/>
                        <hr/>
                        <div><LoginForm/></div>
                    </div>
                </div>
            </div>
        );
}

const mapStateToProps = (state) => { 
    return {
        name: state.user.name,
        token: state.user.token,
        email: state.user.email,
    }
}

export default connect(mapStateToProps, null)(HomePage);