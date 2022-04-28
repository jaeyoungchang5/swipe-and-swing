create table course
 (course_id number(4) PRIMARY KEY,
  course_name varchar(20),
  course_description varchar(300),
  website varchar(100),
  phone_num varchar(15),
  location varchar(20),
  difficulty varchar(10)
 );

drop sequence course_sequence;
create sequence course_sequence;

create or replace trigger course_on_insert
  before insert on course
  for each row
  begin
    select course_sequence.nextval
    into :new.course_id
    from dual;
  end;
/