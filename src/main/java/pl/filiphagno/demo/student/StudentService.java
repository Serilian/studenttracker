package pl.filiphagno.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private StudentDAO studentDAO;

    @Autowired
    public StudentService(StudentDAO studentDAO) {
        this.studentDAO = studentDAO;
    }

    public List<Student> getAllStudents() {
        return studentDAO.selectAllStudents();
    }

    public void saveStudent(UUID studentID, Student student) {
        UUID newStudentId = Optional.ofNullable(studentID).orElse(UUID.randomUUID());

        //TODO: veryfi email not taken

        if(studentDAO.saveStudent(newStudentId, student) ==1) {
            System.out.println("Student added!");
        };
    }
    public void saveStudent(Student student) {
        this.saveStudent(null, student);
    }
}
