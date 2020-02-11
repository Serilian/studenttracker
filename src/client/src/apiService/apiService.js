import fetch from "unfetch";

export const fetchAllStudents = () => {
  return fetch("/api/students");
};

export const saveNewStudent = student => {
  return fetch("api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  });
};
