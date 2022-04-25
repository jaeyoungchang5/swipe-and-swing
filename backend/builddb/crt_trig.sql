create or replace trigger courseadmin_on_insert
  before insert on courseadmin
  for each row
    begin
      select courseadmin_sequence.nextval
      into :new.courseadmin_id
      from dual;
    end;
/
