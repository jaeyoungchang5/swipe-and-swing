create table golfer
 (golfer_id number(4) PRIMARY KEY,
  first_name varchar(15),
  last_name varchar(15),
  age number(3),
  username varchar(20) UNIQUE,
  password varchar(20),
  rating number(2),
  phone_num varchar(10),
  handicap number(2),
  latitude varchar(30),
  longitude varchar(30)
  --default_formality varchar(15),
  --default_drinking number(1),
  --default_num_holes number(2),
  --default_distance float,
  --default_num_people number(1),
  --is_deleted number(2) DEFAULT 0
 );

drop sequence golfer_sequence;
create sequence golfer_sequence;

create or replace trigger golfer_on_insert
  before insert on golfer
  for each row
  begin
    select golfer_sequence.nextval
    into :new.golfer_id
    from dual;
  end;
/

-- create or replace trigger create_new_matches_on_post
--   after insert on post
--   for each row
--   begin

--     --IF golfer_id != post.new:poster_id
--       insert into match (post_id, swiper_id, status)
--       values(1,2,0)
--       --values (post.new:post_id,golfer.golfer_id,0)
--     --END IF;
--   end;
-- /
