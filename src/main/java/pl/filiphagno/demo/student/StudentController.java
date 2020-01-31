package pl.filiphagno.demo.student;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
public class StudentController {

    @GetMapping("api/students")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Student> getAllStudents() {
        return List.of(
                new Student(UUID.randomUUID(), "Filip", "Hagno", "fhagno@yahoo.com", Student.Gender.MALE),
                new Student(UUID.randomUUID(), "Monika", "Hagno", "mhagno@yahoo.com", Student.Gender.FEMALE),
                new Student(UUID.randomUUID(), "Laurka", "Hagno", "lhagno@yahoo.com", Student.Gender.FEMALE));
    }

}
