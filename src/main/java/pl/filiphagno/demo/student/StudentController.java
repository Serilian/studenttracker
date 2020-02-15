package pl.filiphagno.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    private StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() throws ApiRequestException {
//        throw new ApiRequestException("Not givin' you any students");
        return studentService.getAllStudents();
    }

    @PostMapping("/students")
    public void addStudent(@RequestBody @Valid Student student) throws ApiRequestException {
        studentService.saveStudent(student);
    }

    @GetMapping("{studentId}/courses")
    public List<StudentCourse> getAllCoursesForStudent(@PathVariable UUID studentId) {
        return studentService.getAllCoursesForStudent(studentId);
    }
}

