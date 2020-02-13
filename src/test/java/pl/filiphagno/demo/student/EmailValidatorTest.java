package pl.filiphagno.demo.student;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class EmailValidatorTest {

    private final EmailValidator underTest = new EmailValidator();

    @Test
    void itShouldValidateCorrectEmail() {
        assertThat(underTest.test("fhagno@yahoo.com")).isTrue();
    }

    @Test
    void itShouldNotValidateIncorrectEmail() {
        assertThat(underTest.test("aaassddd")).isFalse();
    }
    @Test
    void itShouldNotValidateIncorrectEmailWithoutPartAfterAt() {
        assertThat(underTest.test("aaassddd@")).isFalse();
    }
    @Test
    void itShouldNotValidateIncorrectEmailWithoutDomainPart() {
        assertThat(underTest.test("aaassddd@gmail")).isFalse();
    }
}