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
  location varchar(20)
  --default_formality varchar(15),
  --default_drinking number(1),
  --default_num_holes number(2),
  --default_distance float,
  --default_num_people number(1),
  --is_deleted number(2) DEFAULT 0
 );
