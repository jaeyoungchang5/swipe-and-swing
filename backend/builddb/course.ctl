load data infile 'course.csv'
insert into table course
fields terminated by ","
(course_id,course_name,website,phone_num,latitude,longitude,difficulty)
