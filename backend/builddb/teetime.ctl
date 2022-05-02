load data infile 'teetime.csv'
insert into table teetime
fields terminated by ","
(teetime_id,course_id,golfer1_id,golfer2_id,golfer3_id,golfer4_id,tt_time,tt_date)
