load data infile 'post.csv'
insert into table post
fields terminated by ","
(post_id,poster_id,is_drinking,is_betting,is_music,transport,num_holes,num_people,duration)
