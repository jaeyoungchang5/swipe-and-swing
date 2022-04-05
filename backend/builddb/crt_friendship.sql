create table friendship
 (friendship_id number(4) PRIMARY KEY,
  requester_id number(4),
  requestee_id number(4),
  status number(1),
  time_posted timestamp(2),
  FOREIGN KEY(requester_id) REFERENCES GOLFER(golfer_id),
  FOREIGN KEY(requestee_id) REFERENCES GOLFER(golfer_id)
 );
