create table courseadmin
 (courseadmin_id number(4) PRIMARY KEY,
  course_id number(4),
  username varchar(20) UNIQUE,
  password varchar(20),
  FOREIGN KEY(course_id) REFERENCES COURSE(course_id)
 );
