import React, {useEffect, useState} from 'react';
import './App.css';
import apiService from "../src/apiService/apiService";
import "antd/dist/antd.min.css";
import {Table} from "antd"


function App() {

    let [students, setStudents] = useState([]);


    useEffect(() => {
        apiService.fetchAllStudents()
            .then(resp => resp.json())
            .then(data => setStudents(data))
            .catch(error => console.log(error));
    }, []);

    const columns = [
            {
                title: "Student ID",
                dataIndex: "studentId",
                key: "studentId"
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

    return (
        <div className="App">
            {!students.length && <h2>No students found</h2>}
            {students.length && <Table dataSource={students} columns={columns} rowKey="studentId"/> }
        </div>
);
}

export default App;
