package pl.filiphagno.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    private StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() {
//        throw new IllegalArgumentException();
        return studentService.getAllStudents();
    }

    @PostMapping("/students")
    public void addStudent(@RequestBody Student student) {
        studentService.saveStudent(student);
    }

}
