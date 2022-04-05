create table teetime
 (teetime_id number(4), 
  course_id number(4),
  golfer1_id number(4),
  golfer2_id number(4),
  golfer3_id number(4),
  golfer4_id number(4),
  num_holes number(2),
  time timestamp(2),
  FOREIGN KEY(course_id) REFERENCES COURSE(course_id),
  FOREIGN KEY(golfer1_id) REFERENCES GOLFER(golfer_id),
  FOREIGN KEY(golfer2_id) REFERENCES GOLFER(golfer_id),
  FOREIGN KEY(golfer3_id) REFERENCES GOLFER(golfer_id),
  FOREIGN KEY(golfer4_id) REFERENCES GOLFER(golfer_id)
);
