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

                props.onUserLogin({ email: values.email, password: values.password })
            }, 500);
        }}
        
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