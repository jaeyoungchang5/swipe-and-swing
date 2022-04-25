create table courseadmin
 (courseadmin_id number(4) PRIMARY KEY,
  course_id number(4),
  username varchar(20) UNIQUE,
  password varchar(20),
  FOREIGN KEY(course_id) REFERENCES COURSE(course_id)
 );

drop sequence courseadmin_sequence;
create sequence courseadmin_sequence;

create or replace trigger courseadmin_on_insert
  before insert on courseadmin
  for each row
  begin
    select courseadmin_sequence.nextval
    into :new.courseadmin_id
    from dual;
  end;
/
