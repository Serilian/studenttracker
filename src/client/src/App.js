import React, {useEffect, useState} from 'react';
import './App.css';
import apiService from "../src/apiService/apiService";
import {Avatar, Table, Spin, Icon} from "antd"
import Container from "./components/Container";


function App() {

    let [students, setStudents] = useState([]);
    let [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);
        apiService.fetchAllStudents()
            .then(resp => resp.json())
            .then(data => setStudents(data))
            .then(() => setFetching(false))
            .catch(error => {
                console.log(error);
                setFetching(false);
            });
    }, []);

    const columns = [
        {
            title: "",
            key: "avatar",
            render: (text, student) => (
                <Avatar size={"large"}>
                    {`${student.firstName.charAt(0).toLocaleUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
                </Avatar>
            )
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName"
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender"
        }
    ];

    const indicator = <Icon type={"loading"} style={{fontSize: "24"}} spin={"true"}/>;

    return (
        <Container>
            <div style={{textAlign: "center"}}>
            {fetching && <Spin style={{flex: 1}} size={"large"} spinning={true} indicator={indicator}/>}
            </div>
            <div>
                {(!students.length && !fetching) && <h2>No students found</h2>}
                {students.length &&
                <Table
                    pagination={false}
                    dataSource={students}
                    columns={columns}
                    rowKey="studentId"/>}
            </div>
        </Container>
    );
}

export default App;
