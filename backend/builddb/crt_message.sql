create table message
 (message_id number(4) PRIMARY KEY,
  sender_id number(4),
  receiver_id number(4),
  content varchar(300),
  --time_sent timestamp(2),
  FOREIGN KEY(sender_id) REFERENCES GOLFER(golfer_id),
  FOREIGN KEY(receiver_id) REFERENCES GOLFER(golfer_id)
 );

drop sequence message_sequence;
create sequence message_sequence;

create or replace trigger message_on_insert
  before insert on message
  for each row
  begin
    select message_sequence.nextval
    into :new.message_id
    from dual;
  end;
/