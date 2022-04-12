create table match
 (match_id number(4) PRIMARY KEY,
  post_id number(4),
  swiper_id number(4),
  status number(1),
  --time_matched timestamp(2),
  FOREIGN KEY(post_id) REFERENCES POST(post_id),
  FOREIGN KEY(swiper_id) REFERENCES GOLFER(golfer_id)
 );
