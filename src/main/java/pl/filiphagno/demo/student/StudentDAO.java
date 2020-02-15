package pl.filiphagno.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentDAO {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    List<Student> selectAllStudents() {

        String sql = "" +
                "Select student_id, " +
                "first_name, " +
                "last_name, " +
                "email, " +
                "gender " +
                "from student;";

        return jdbcTemplate.query(sql, mapStudentFromDb());
    }

    private RowMapper<Student> mapStudentFromDb() {
        return (resultSet, i) -> {
            String studentIdstr = resultSet.getString("student_id");
            UUID studentId = UUID.fromString(studentIdstr);
            String firstName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String email = resultSet.getString("email");
            String genderStr = resultSet.getString("gender").toUpperCase();
            Student.Gender gender = Student.Gender.valueOf(genderStr);

            return new Student(studentId, firstName, lastName, email, gender);
        };
    }

    public int saveStudent(UUID studentId, Student student) {

            String sql = "" +
                    "INSERT into student (student_id, first_name, last_name, email, gender) " +
                    "values(?, ?, ?, ?, ?::gender);";

            System.out.println("Saving student to db " + studentId + student);

            return jdbcTemplate.update(sql,
                    studentId,
                    student.getFirstName(),
                    student.getLastName(),
                    student.getEmail(),
                    student.getGender().name().toUpperCase());
    }

    boolean isEmailTaken(String email) {
        String sql = "" +
                "SELECT exists ( select 1 " +
                "FROM student " +
                "WHERE email = ? );";

        return jdbcTemplate.queryForObject(sql, new Object[]{email},
                ((resultSet, i) -> resultSet.getBoolean(1)));
    }

    public List<StudentCourse> getAllCoursesForStudent(UUID studentId) {

        String sql = "" +
                "SELECT student.student_id, " +
                "course.course_id, " +
                "course.name, " +
                "course.description, " +
                "course.department, " +
                "course.teacher_name, " +
                "student_course.start_date, " +
                "student_course.end_date, " +
                "student_course.grade " +
                "FROM student " +
                "JOIN student_course USING (student_id) " +
                "JOIN course USING (course_id) " +
                "WHERE student.student_id = ?";

        return jdbcTemplate.query(sql, new Object[]{studentId},
                mapStudentCourseFromDB());

    }

    private RowMapper<StudentCourse> mapStudentCourseFromDB() {
        return (resultSet, i) ->
                new StudentCourse(
                        UUID.fromString(resultSet.getString("student_id")),
                        UUID.fromString(resultSet.getString("course_id")),
                        resultSet.getString("name"),
                        resultSet.getString("description"),
                        resultSet.getString("department"),
                        resultSet.getString("teacher_name"),
                        resultSet.getDate("start_date").toLocalDate(),
                        resultSet.getDate("end_date").toLocalDate(),
                        Optional.ofNullable(resultSet.getString("grade"))
                                .map(Integer::parseInt)
                                .orElse(null)
                );
    }
}

