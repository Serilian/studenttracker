import React from 'react';
import Container from "./Container";
import {Avatar, Button} from 'antd';

const Footer = ({numberOfStudents, openModal}) => {
    return (
        <div style={
            {
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                background: "rgba(240,240,240,0.9)",
                height: "5em",
                padding: "1em"
            }}>
            <Container>
                {numberOfStudents &&
                <Avatar style={
                    {backgroundColor: "#f56a00", marginRight: "5px"}}
                        size="large">{numberOfStudents}</Avatar>
                }
                <Button type="primary" onClick={openModal}>Add new student</Button>
            </Container>
        </div>
    );
};

export default Footer;