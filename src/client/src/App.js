import React, {useEffect, useState} from 'react';
import './App.css';
import {Avatar, Table, Spin, Icon, Modal} from "antd"
import Container from "./components/Container";
import Footer from "./components/Footer";
import AddStudentForm from "./components/AddStudentForm";
import {fetchAllStudents} from "./apiService/apiService";


function App() {

    let [students, setStudents] = useState([]);
    let [fetching, setFetching] = useState(false);
    let [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setFetching(true);
        fetchAllStudents()
            .then(resp => resp.json())
            .then(data => setStudents(data))
            .then(() => setFetching(false))
            .catch(error => {
                console.log(error);
                setFetching(false);
            });
    }, []);

    const openModal =()=> {
        setModalVisible(true);
    };

    const closeModal =()=> {
        setModalVisible(false);
    };

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
                    <Modal
                        title={"Add new student"}
                        visible={isModalVisible}
                        onOk={closeModal}
                        onCancel={closeModal}
                        width={1000}
                    >
                        <AddStudentForm />
                    </Modal>
            </div>
            <Footer numberOfStudents={students.length} openModal={openModal}/>
        </Container>
    );
}

export default App;
