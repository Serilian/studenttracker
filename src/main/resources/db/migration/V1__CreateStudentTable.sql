CREATE TABLE IF NOT EXISTS student (
    student_id UUID PRIMARY KEY NOT NULL ,
    first_name varchar(100) not null ,
    last_name varchar(100) not null,
    email varchar(100) not null unique ,
    gender varchar(6) not null  check(gender = 'MALE' or
                                      gender = 'FEMALE' or
                                      gender = 'male' or
                                      gender = 'female' or
                                      gender = 'UNKNOWN' or
                                      gender = 'unknown'
                                      )
);