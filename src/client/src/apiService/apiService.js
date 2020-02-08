import fetch from "unfetch";

export const fetchAllStudents = () => {
    return fetch("/api/students");
};

export const saveNewStudent = (values)=> {
  return fetch("api/students", values)
};




