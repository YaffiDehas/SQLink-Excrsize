import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "../styles/app.css";
import "../styles/loadingSpinner.css";

const ValidatedLoginForm = (props) => (
    <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                console.log("Logging in", values);
                setSubmitting(false);
                console.log(props, "props");

                props.onUserLogin({ email: "ghjk", password: "3456" })
            }, 500);
        }}
        // validate={values => {
        //     let errors = {};
        //     if (!values.email) {
        //         errors.email = "Required";
        //     } else if (!EmailValidator.validate(values.email)) {
        //         errors.email = "Invalid email address.";
        //     }

        //     const passwordRegex = /(?=.*[0-9])/;
        //     if (!values.password) {
        //         errors.password = "Required";
        //     } else if (values.password.length < 8) {
        //         errors.password = "Password must be 8 characters long.";
        //     } else if (!passwordRegex.test(values.password)) {
        //         errors.password = "Invalid password. Must contain one number.";
        //     }

        //     return errors;
        // }}
        validationSchema={Yup.object().shape({
            email: Yup.string()
                .email()
                .required("Required"),
            password: Yup.string()
                .required("No password provided.")
                .min(8, "Password is too short - should be 8 chars minimum.")
                .matches(/(?=.*[0-9])/, "Password must contain a number.")
        })}
    >
        {props => {
            const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
            } = props;
            return (
                <form onSubmit={handleSubmit}>

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter your email"
                        value={props.values && props.values.email || ""}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        className={props.errors && props.errors.email && props.touched && props.touched.email && "error"}
                    />
                    {props.errors && props.errors.email && props.touched && props.touched.email && (
                        <div className="input-feedback">{props.errors && props.errors.email}</div>
                    )}

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={props.values && props.values.password || ""}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        className={props.errors && props.errors.password && props.touched && props.touched.password && "error"}
                    />
                    {props.errors.password && props.touched && props.touched.password && (
                        <div className="input-feedback">{props.errors && props.errors.password}</div>
                    )}

                    <button type="submit" disabled={!props.isValid}>
                        Login
                    </button>
                    {props.loading && <div className="spinner-container">
                        <div className="loading-spinner"></div>
                    </div>}
                </form>
            );
        }}
    </Formik>
);

export default ValidatedLoginForm;