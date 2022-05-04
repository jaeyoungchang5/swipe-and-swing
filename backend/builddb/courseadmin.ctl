load data infile 'courseadmin.csv'
insert into table courseadmin
fields terminated by ","
(courseadmin_id,course_id,username,password)
