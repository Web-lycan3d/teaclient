/** @format */

import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import * as zod from "zod";
import { yupResolver } from "@hookform/resolvers/yup";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../redux/alert/alert.actions";
import { GoogleLoginAction, registerUser } from "../../redux/user/user.actions";

import Form from "../form/form.component";
import Input from "../inputField/Input.component";
import SubmitButton from "../formButton/SubmitButton.component";
import "./loginForm.styles.scss";
import axios from "axios";
import apiUrl from "../../apiUrl/api";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";

const Schema = zod.object({
  username: zod
    .string()
    .nonempty({ message: "Name is required" })
    .min(4, { message: "Minimun of 4 letters is required" })
    .regex(/^([^0-9]*)$/, { message: "Name should not contain numbers" }),

  email: zod
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Entered email should have correct format" }),
  password: zod
    .string()
    .nonempty({ message: "Password is required" })
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      "Include @, Caps, digit & at least 8 characters"
    ),
  confirmPassword: zod
    .string()
    .nonempty({ message: "password is required" })
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      "Include @, Caps, digit & at least 8 characters"
    ),
});
const backendUrl = apiUrl();

const RegisterForm = ({ setAlert, registerUser }) => {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState();
  const [registerState, setRegisterState] = useState(false);
  const [otp, setOtp] = useState(null);
  const [userOTP, setUserOTP] = useState();
  const [emailErrorState, setEmailErrorState] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [loginErrors, setLoginErrors] = useState(false);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      return setAlert("Password did not match", "danger");
    }
    setUserDetails(data);

    const checkUser = await axios.post(
      backendUrl + "/api/user/checkuser",
      data
    );
    if (checkUser.data.userExists) {
      setEmailErrorState(true);
    } else {
      setEmailErrorState(false);
      const resp = await axios.post(backendUrl + "/api/user/verify", data);
      setOtpError(false);
      setRegisterState(true);

      setOtp(resp.data.otpValue);
    }
  };
  const handleOtp = async (e) => {
    e.preventDefault();

    if (userOTP === otp) {
      const { password, email, username } = userDetails;
      setOtpError(false);
      await registerUser({ username, email, password });
      history.push("/");
    } else {
      setOtpError(true);
    }
  };
  const handleGoogleSuccess = async (res) => {
    const googleUser = res.profileObj;
    const token = res.tokenId;

    const data = {
      googleUser,
      token,
    };

    await dispatch(GoogleLoginAction(data));
    history.push("/");

    loginErrors && setLoginErrors(false);
  };
  const handleGoogleFailure = (res) => {
    setLoginErrors(true);
  };
  const handleResendOtp = async (res) => {
    const resp = await axios.post(backendUrl + "/api/user/verify", userDetails);

    setOtp(resp.data.otpValue);
  };
  return (
    <Fragment>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="title">
        {registerState ? "" : "Register"}
      </motion.h1>
      {loginErrors ? (
        <div className="login-error">
          <p>Please clear your Cached images and files</p>
          <p>{"Settings -> Privacy&Security -> clear browsing data"}</p>
          <p>{"(if you closed the google popup please Ignore this message)"}</p>
        </div>
      ) : (
        ""
      )}
      {!registerState ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("username")}
              name="username"
              label="Username"
              className="mater-in"
              placeholder="Username"
              {...register("username")}
            />
            {errors?.username && (
              <span className="error-1">{errors?.username?.message}</span>
            )}
            <Input
              {...register("email")}
              name="email"
              label="Email"
              placeholder="Email"
            />{" "}
            {errors?.email && (
              <span className="error-1">{errors?.email?.message}</span>
            )}
            {emailErrorState && (
              <span className="error">Email already exists?</span>
            )}
            <Input
              {...register("password")}
              name="password"
              label="Password"
              placeholder="Password"
            />{" "}
            {errors?.password && (
              <span className="error-1">{errors?.password?.message}</span>
            )}
            <Input
              {...register("confirmPassword")}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
            />{" "}
            {errors?.confirmPassword && (
              <span className="error-1">
                {errors?.confirmPassword?.message}
              </span>
            )}
            <SubmitButton>Register</SubmitButton>
            <GoogleLogin
              clientId="1875614009-hrc1csc954jrjt2lsebdotnkp9ad7mol.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  className="google-login-btn"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}>
                  <FcGoogle className="google-icon" />
                  Sign up with Google
                </button>
              )}
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy={"single_host_origin"}
            />
          </Form>
        </motion.div>
      ) : (
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="otp-div">
          <form onSubmit={handleOtp}>
            <span>OTP sent to {userDetails?.email}</span>{" "}
            {otpError && (
              <>
                <span className="error">
                  OTP is Not Valid please enter the correct OTP.
                </span>
                <span
                  className="error register-handle"
                  onClick={() => setRegisterState(false)}>
                  Go back/Submit again
                </span>
              </>
            )}
            {!otpError && (
              <>
                <span className="error">Didn't recieve the otp</span>
                <span
                  className="error register-handle"
                  onClick={handleResendOtp}>
                  Resend otp
                </span>
              </>
            )}
            <input
              type="number"
              name="otp"
              placeholder="Enter OTP"
              onChange={(e) => setUserOTP(e.target.value)}
            />
            <button type="submit">Verify</button>
          </form>
        </div>
      )}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="no-account">
        Already have an account,{" "}
        <Link className="link" to="/login">
          Login{" "}
        </Link>
        here
      </motion.span>
    </Fragment>
  );
};

RegisterForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, registerUser })(RegisterForm);
