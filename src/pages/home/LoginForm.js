import React from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { storeUser } from '../../redux/User/actions';
import { connect } from 'react-redux';
import { LINKBUK_API_BASE_URL } from './../../config/baseUrl';

function LoginForm (props) {

    const responseSuccessGoogle = (response) => {
        axios({
            method: "POST",
            url: LINKBUK_API_BASE_URL + "/api/googlelogin",
            data:{ tokenId: response.tokenId }
        }).then(async (response) => {
            await props.storeUser(response.data);
            window.location.replace("/dashboard");
        });
    }
    
    const responseErrorGoogle = (response) => {
        console.log("Login Error");
        console.log("response is ", response);
        return (
            <div>Login Error</div>
        )
    }
    // <div className="FormTitle"><h3>Login</h3></div><br />
    return (
        <div className="LoginBox"><br />
            <div class="g-signin2" data-width="600" data-height="200" data-longtitle="true" >
                <GoogleLogin
                    clientId="911491505806-m0be9rfams9moafgbgsdm4811s3u5966.apps.googleusercontent.com"
                    buttonText="Sign in with Google"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>       
        </div>   
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeUser: (user) => dispatch(storeUser(user)),
    }
}

export default connect(null, mapDispatchToProps)(LoginForm);
