import React, { useEffect, useState } from "react";
import "./App.css";
import { Avatar, Table, Spin, Icon, Modal, notification, Empty } from "antd";
import Container from "./components/Container";
import Footer from "./components/Footer";
import AddStudentForm from "./components/AddStudentForm";
import { fetchAllStudents } from "./apiService/apiService";

function App() {
  let [students, setStudents] = useState([]);
  let [fetching, setFetching] = useState(false);
  let [isModalVisible, setModalVisible] = useState(false);

  const fetchStudents = () => {
    setFetching(true);
    fetchAllStudents()
      .then(checkStatus)
      .then(resp => resp.json())
      .then(data => {
        setStudents(data);
        openNotification(
          "info",
          "students fetched",
          "Got all students from the server"
        );
      })
      .then(() => setFetching(false))
      .catch(error => {
        let description = "";
        if (error.error) {
          description = error.error.status + " " + error.error.message;
        } else if (error.message) {
          description = error.message;
        }
        let message = "Oppps something went wrong;(";
        openNotification("error", message, description);
        setFetching(false);
      });
  };

  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description
    });
  };

  const checkStatus = resp => {
    if (resp.ok) {
      return resp;
    } else {
      let error = new Error(resp.statusText);
      error.resp = resp;
      resp.json().then(err => (error.error = err));
      return Promise.reject(error);
    }
  };

  useEffect(fetchStudents, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const columns = [
    {
      title: "",
      key: "avatar",
      render: (text, student) => (
        <Avatar size={"large"}>
          {`${student.firstName
            .charAt(0)
            .toLocaleUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
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

  const indicator = (
    <Icon type={"loading"} style={{ fontSize: "24" }} spin={"true"} />
  );

  const empty = (
    <Container>
      <Empty description={"No students found"} />
    </Container>
  );

  let content = <></>;

  if (students.length > 0) {
    content = (
      <Table
        style={{ marginBottom: "100px" }}
        pagination={false}
        dataSource={students}
        columns={columns}
        rowKey="studentId"
      />
    );
  } else {
    content = empty;
  }

  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        {fetching && (
          <Spin
            style={{ flex: 1 }}
            size={"large"}
            spinning={true}
            indicator={indicator}
          />
        )}
      </div>
      {content}
      <div>
        <Modal
          title={"Add new student"}
          visible={isModalVisible}
          onOk={closeModal}
          onCancel={closeModal}
          width={1000}
        >
          <AddStudentForm
            onSuccess={() => {
              closeModal();
              fetchStudents();
              openNotification(
                "success",
                "Student added",
                "Student saved correctly"
              );
            }}
          />
        </Modal>
      </div>
      <Footer numberOfStudents={students.length} openModal={openModal} />
    </Container>
  );
}

export default App;
