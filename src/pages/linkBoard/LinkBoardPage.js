import React from 'react';
import { connect } from 'react-redux';
import TopNavBar from './../../components/navBar';
import LinkBoard from './LinkBoard';
import { logOutUser } from '../../redux/User/actions';

function LinkBoardPage(props) {
        if(props.name===undefined || props.token===undefined || props.email===undefined){
            console.log("Access Unauthorized");
            return (
                <div className="Page">
                    <div className="NavBar">
                        <TopNavBar page='home'/>
                    </div>
                    Error 401 Access Unauthorized! <br/>
                    Click here to <a href="http://localhost:3000/">log in</a>
                </div>
            );
        }
        return (
            <div className="Page">
                <div className="NavBar">
                    <TopNavBar name={props.name} logOutUser={props.logOutUser} page='LinkBoard' />
                </div>
                <div className="LinkBoard">
                    <LinkBoard email={props.email} name={props.name} token={props.token} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        logOutUser: () => dispatch(logOutUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkBoardPage);