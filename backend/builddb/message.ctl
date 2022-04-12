load data infile 'message.csv'
insert into table message
fields terminated by ","
(message_id,sender_id,receiver_id,content)
