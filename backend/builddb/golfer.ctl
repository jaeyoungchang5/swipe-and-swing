load data infile 'golfer.csv'
insert into table golfer
fields terminated by ","
(golfer_id,first_name,last_name,age,username,password,rating,phone_num,handicap,location)
