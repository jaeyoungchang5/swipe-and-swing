create table match
 (match_id number(4) PRIMARY KEY,
  post_id number(4),
  swiper_id number(4),
  status number(1),
  --time_matched timestamp(2),
  FOREIGN KEY(post_id) REFERENCES POST(post_id),
  FOREIGN KEY(swiper_id) REFERENCES GOLFER(golfer_id)
 );

drop sequence match_sequence;
create sequence match_sequence;

create or replace trigger match_on_insert
  before insert on match
  for each row
  begin
    select match_sequence.nextval
    into :new.match_id
    from dual;
  end;
/
