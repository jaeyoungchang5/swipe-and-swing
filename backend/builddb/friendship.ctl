load data infile 'friendship.csv'
insert into table friendship
fields terminated by ","
(friendship_id,requester_id,requestee_id,status)
