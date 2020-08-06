import React, { useState } from "react";
import { Link } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import InputAdornment from '@material-ui/core/InputAdornment';
import { Row, Col, Button } from 'reactstrap';
import signin from './../../Asset/images/signin-image.webp';
import * as ActionTypes from '../../Store/Action/Action';
import './Css.css';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
        boxShadow: "0px 0px 1px 1px lightgrey"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const SignIn = (props) => {

    const classes = useStyles();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [nameVal, setNameVal] = useState(true);
    const [pswVal, setpswVal] = useState(true);

    const handlePasswordValidation = () => {
        let log = false;
        props.loginData.map((val) => {
            if (val.name === name && val.password === password) {
                if (val.name === 'Admin' && val.password === '12345')
                    props.adminLogin(true);
                props.signInFun(true);
                log = true;
                sessionStorage.setItem("isUserLogged", true);
                props.history.push('./home');
            }
            return null;
        });

        if (!log) {
            alert('Please enter the valid user name and password')
        }
    };

    const handleTextChange = (event, name) => {
        const value = event.target.value;
        if (name === "password") {
            setPassword(value);
            if (!value || value.trim().length === 0) {
                setpswVal(true);
            }
            else
                setpswVal(false);
        }
        else if (name === "name") {
            setName(value);
            if (!value || value.trim().length === 0) {
                setNameVal(true)
            }
            else
                setNameVal(false)
        }
    };


    return (
        <Container component="main" maxWidth="md">
            <div className={classes.paper}>
                <form className={classes.form}>
                    <Row>
                        <Col>
                            <img src={signin} alt="signin" /><br /><br /><br />
                            <Link to='/signup'><span style={{ textDecoration: 'underline' }}>Create an account</span></Link>
                        </Col>
                        <Col>
                            <h1>Sign in</h1>
                            <TextField
                                id="input-with-icon-textfield"
                                placeholder="Your Name"
                                error={nameVal}
                                onChange={(event) => handleTextChange(event, "name")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <i className="zmdi zmdi-account zmdi-hc-lg"></i>
                                        </InputAdornment>
                                    ),
                                }}
                            /><br /><br />
                            <TextField
                                id="input-with-icon-textfield"
                                type="password"
                                placeholder="Password"
                                error={pswVal}
                                onChange={(event) => handleTextChange(event, "password")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <i className="zmdi zmdi-lock"></i>
                                        </InputAdornment>
                                    ),
                                }}
                            /><br /><br />

                            <Button style={{ backgroundColor: '#6384f9' }}
                                onClick={() => handlePasswordValidation()}
                                disabled={nameVal || pswVal}
                            >Log in</Button>
                        </Col>
                    </Row>
                </form>
            </div>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        loginData: state.loginData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signInFun: (isSignedIn) => {
            dispatch({
                type: ActionTypes.signInFun,
                payload: {
                    "isSignedIn": isSignedIn
                }
            })
        },
        adminLogin: (isAdmin) => {
            dispatch({ type: ActionTypes.adminLogin, payload: { "isAdmin": isAdmin } })
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);


