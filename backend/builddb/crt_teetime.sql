create table teetime
 (teetime_id number(4) PRIMARY KEY, 
  course_id number(4),
  golfer1_id number(4),
  golfer2_id number(4),
  golfer3_id number(4),
  golfer4_id number(4),
  --num_holes number(2),
  tt_time varchar(20),
  tt_date varchar(20),
  FOREIGN KEY(course_id) REFERENCES COURSE(course_id),
  FOREIGN KEY(golfer1_id) REFERENCES GOLFER(golfer_id),
  FOREIGN KEY(golfer2_id) REFERENCES GOLFER(golfer_id),
  FOREIGN KEY(golfer3_id) REFERENCES GOLFER(golfer_id),
  FOREIGN KEY(golfer4_id) REFERENCES GOLFER(golfer_id)
);

drop sequence teetime_sequence;
create sequence teetime_sequence;

create or replace trigger teetime_on_insert
  before insert on teetime
  for each row
  begin
    select teetime_sequence.nextval
    into :new.teetime_id
    from dual;
  end;
/
