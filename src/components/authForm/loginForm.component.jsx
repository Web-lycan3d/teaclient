/** @format */

import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import GoogleLogin from "react-google-login";
import PropTypes from "prop-types";
import {
  loginUser,
  loginAdmin,
  GoogleLoginAction,
} from "../../redux/user/user.actions";

import Form from "../form/form.component";
import Input from "../inputField/Input.component";
import SubmitButton from "../formButton/SubmitButton.component";
import "./loginForm.styles.scss";
import apiUrl from "../../apiUrl/api";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const Schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
const backendUrl = apiUrl();

const LoginForm = ({
  loginUser,
  isAuthenticated,
  message,
  isAdmin,
  loginAdmin,
}) => {
  const [userError, setUserError] = useState(false);
  const [passwError, setPasswError] = useState(false);
  const [loginErrors, setLoginErrors] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(Schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    const resp = await axios.post(backendUrl + "/api/user/userauth", data);

    if (
      email === process.env.REACT_APP_EMAIL_ID &&
      password === process.env.REACT_APP_EMAIL_PASS
    ) {
      loginAdmin({ email, password });
    } else {
      if (!resp.data.userExists) {
        setUserError(true);
        setPasswError(false);
      } else if (resp.data.wrongPass) {
        setPasswError(true);
        setUserError(false);
      } else {
        setUserError(false);
        setPasswError(false);
        loginUser({ email, password });
      }
    }
  };
  if (isAdmin) {
    return <Redirect to="/admin_dashboard" />;
  }
  // clientSecert  Yl0Q9PoG8aXSzGXtG1tx1C7w
  //clientId 1875614009-hrc1csc954jrjt2lsebdotnkp9ad7mol.apps.googleusercontent.com
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const handleGoogleSuccess = (res) => {
    const googleUser = res.profileObj;
    const token = res.tokenId;

    const data = {
      googleUser,
      token,
    };
    dispatch(GoogleLoginAction(data));

    loginErrors && setLoginErrors(false);
  };
  const handleGoogleFailure = (res) => {
    setLoginErrors(true);
  };

  return (
    <Fragment>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="title">
        Login
      </motion.h1>
      {message && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="error-login-cart">
          Login first
        </motion.span>
      )}
      {loginErrors ? (
        <div className="login-error">
          <p>Please clear your Cached images and files</p>
          <p>{"Settings -> Privacy&Security -> clear browsing data"}</p>
          <p>{"(if you closed the google popup please Ignore this message)"}</p>
        </div>
      ) : (
        ""
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email")}
            name="email"
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          {userError && <span className="error">User doesn't exist</span>}
          <Input
            {...register("password")}
            name="password"
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors?.password?.message}
          />
          {passwError && <span className="error">Wrong password</span>}
          <SubmitButton>LOGIN</SubmitButton>
          <GoogleLogin
            clientId="1875614009-hrc1csc954jrjt2lsebdotnkp9ad7mol.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                className="google-login-btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}>
                <FcGoogle className="google-icon" />
                Sign in with Google
              </button>
            )}
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </Form>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="no-account">
        Don't have an account,{" "}
        <Link className="link" to="/register">
          Sign up{" "}
        </Link>{" "}
        here
      </motion.span>
    </Fragment>
  );
};

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loginAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  isAdmin: state.user.isAdmin,
});

export default connect(mapStateToProps, { loginUser, loginAdmin })(LoginForm);
