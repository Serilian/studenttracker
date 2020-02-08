import React from 'react';
import {Formik} from "formik";
import {Input, Button, Tag} from "antd";
import {saveNewStudent} from "../apiService/apiService";

const tagStyle = {
    backgroundColor: "#f50",
    color: "#fff",
    marginBottom: "5px"
};

const AddStudentForm = () => {

    return (
        <div>
            <Formik
                initialValues={{firstName: "", lastName: "", email: "", gender: ""}}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.firstName) {
                        errors.firstName = 'Required';
                    }
                    if (!values.lastName) {
                        errors.lastName = 'Required';
                    }
                    if (!values.gender) {
                        errors.gender = 'Required';
                    } else if (!["MALE", "male", "FEMALE", "female", "unknown", "UNKNOWN"].includes(values.gender)) {
                        errors.gender = "Incorrect value for gender. Correct ones: MALE, FEMALE, UNKNOWN"
                    }
                    return errors;
                }}
                onSubmit={(values, {isSubmitting}) => {
                        isSubmitting = true;
                        saveNewStudent(values)
                            .then(resp => {
                                console.log(resp);
                                isSubmitting = false;
                            });
                    }
                }>
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, submitForm, isValid}
                ) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Input
                                style={{marginBottom: "5px"}}
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                placeholder={"First Name"}
                                onBlur={handleBlur}
                            />
                            {errors.firstName && touched.firstName && <Tag style={tagStyle}>{errors.firstName}</Tag>}
                            <Input
                                style={{marginBottom: "5px"}}
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                placeholder={"Last Name"}
                                onBlur={handleBlur}
                            />
                            {errors.lastName && touched.lastName && <Tag style={tagStyle}>{errors.lastName}</Tag>}
                            <Input
                                style={{marginBottom: "5px"}}
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder={"Email"}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email && <Tag style={tagStyle}>{errors.email}</Tag>}
                            <Input
                                style={{marginBottom: "5px"}}
                                name="gender"
                                value={values.gender}
                                onChange={handleChange}
                                placeholder={"Gender: male, female, unknown"}
                                onBlur={handleBlur}
                            />
                            {errors.gender && touched.gender && <Tag style={tagStyle}>{errors.gender}</Tag>}
                            <hr/>
                            <Button type="submit" onClick={submitForm} disabled={isSubmitting || !isValid}>Submit</Button>
                        </form>
                    )
                }}
            </Formik>
        </div>
    );
};

export default AddStudentForm;
