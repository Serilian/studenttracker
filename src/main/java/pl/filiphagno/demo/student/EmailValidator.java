package pl.filiphagno.demo.student;

import org.springframework.stereotype.Component;

import java.util.function.Predicate;
import java.util.regex.Pattern;

@Component
public final class EmailValidator implements Predicate<String> {

    private static final Predicate<String> IS_EMAIL_VALID =
            Pattern.compile("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
                    "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", Pattern.CASE_INSENSITIVE)
            .asPredicate();

    @Override
    public boolean test(String email) {
        return IS_EMAIL_VALID.test(email);
    }

}
