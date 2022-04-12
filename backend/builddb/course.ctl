load data infile 'course.csv'
insert into table course
fields terminated by ","
(course_id,course_name,course_description,website,phone_num,location,difficulty)
