SELECT * FROM post WHERE location = 'Notre Dame' AND poster_id != 3 AND poster_id NOT IN (SELECT post_id FROM match WHERE swiper_id = 3 AND status > 0)
/
