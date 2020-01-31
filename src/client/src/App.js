import React, {useEffect, useState} from 'react';
import './App.css';
import apiService from "../src/apiService/apiService";


function App() {

    let [students, setStudents] = useState([]);

    useEffect(() => {
      apiService.fetchAllStudents()
          .then(resp => resp.json())
          .then(data => setStudents(data))
          .catch(error=> console.log(error));
      }, []);

    return (
        <div className="App">
          {students.length && students.map(student=> {
            return (
                <div key={student.studentId}>
                  <p> Name: {student.firstName} {student.lastName} Email: {student.email} gender: {student.gender}</p>
                </div>
            )
          })}
        </div>
    );
}

export default App;
