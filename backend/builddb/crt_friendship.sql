create table friendship
 (friendship_id number(4) PRIMARY KEY,
  requester_id number(4),
  requestee_id number(4),
  status number(1),
  --time_posted timestamp(2),
  FOREIGN KEY(requester_id) REFERENCES GOLFER(golfer_id),
  FOREIGN KEY(requestee_id) REFERENCES GOLFER(golfer_id)
 );

drop sequence friendship_sequence;
create sequence friendship_sequence;

create or replace trigger friendship_on_insert
  before insert on friendship
  for each row
  begin
    select friendship_sequence.nextval
    into :new.friendship_id
    from dual;
  end;
/