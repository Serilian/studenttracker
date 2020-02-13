package pl.filiphagno.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentDAO studentDAO;
    private final EmailValidator emailValidator;

    @Autowired
    public StudentService(StudentDAO studentDAO, EmailValidator emailValidator) {
        this.emailValidator = emailValidator;
        this.studentDAO = studentDAO;
    }

    public List<Student> getAllStudents() {
        return studentDAO.selectAllStudents();
    }

    public void saveStudent(UUID studentID, Student student) throws ApiRequestException {
        UUID newStudentId = Optional.ofNullable(studentID).orElse(UUID.randomUUID());

        if(emailValidator.test(student.getEmail())) {
            if(studentDAO.saveStudent(newStudentId, student) ==1) {
                System.out.println("Student added!");
            };
        } else {
            throw new ApiRequestException("Invalid email for student: " + student.getEmail());
        }

        //TODO: veryfi email not taken


    }
    public void saveStudent(Student student) throws ApiRequestException {
        this.saveStudent(null, student);
    }
}
