create table post
 (post_id number(4) PRIMARY KEY,
  poster_id number(4),
  --location varchar(15),
  --formality varchar(15),
  is_drinking number(1),
  is_betting number(1),
  is_music number(1),
  transport varchar(10),
  num_holes number(2),
  num_people number(1),
  duration number(2),
  --caption varchar(300),
  --time_posted timestamp(2),
  --lifespan varchar(10),
  FOREIGN KEY(poster_id) REFERENCES GOLFER(golfer_id)
 );

drop sequence post_sequence;
create sequence post_sequence;

create or replace trigger post_on_insert
  before insert on post
  for each row
  begin
    select post_sequence.nextval
    into :new.post_id
    from dual;
  end;
/
