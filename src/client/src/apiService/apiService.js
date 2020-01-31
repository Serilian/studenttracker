import fetch from "unfetch";

class ApiService {
    fetchAllStudents = ()=> {
       return fetch("/api/students")
    }
}

export default new ApiService();