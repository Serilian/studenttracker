

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

export const fetchCoursesForStudent = (id)=> {
  return fetch(`api/${id}/courses`);
};
