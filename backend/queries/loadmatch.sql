SELECT * FROM match m,post p,golfer g WHERE m.post_id = p.post_id AND m.swiper_id = g.golfer_id AND m.status = 3 AND p.poster_id = 3 AND (g.first_name = 'Timmy' OR g.last_name = 'Gallagher')
/
