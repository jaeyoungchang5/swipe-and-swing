load data infile 'match.csv'
insert into table match
fields terminated by ","
(match_id,post_id,swiper_id,status)
