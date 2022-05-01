import functools
from xml.etree.ElementTree import tostring

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from sas.db import get_db

import json

bp = Blueprint('swipe', __name__, url_prefix='/swipe')

@bp.route('/getMatches', methods=('GET', 'POST'))
def getMatches():
    if request.method == 'POST':
        db = get_db()
        cursor = db.cursor()

        data = dict(sid=request.form["golfer_id"])

        query = """
        select m.match_id, m.status, m.swiper_id, g.golfer_id, g.first_name, g.last_name, g.age, g.phone_num, g.handicap, p.transport, p.is_drinking, p.is_betting, p.is_music, p.num_holes, p.num_people
        from match m, post p, golfer g
        where m.status = 0 and m.swiper_id = :sid and m.post_id = p.post_id and p.poster_id = g.golfer_id
        """

        res = cursor.execute(
            query,
            data
        ).fetchall()

        if res is None:
            print("no matches")
            return json.dumps({'success':False, 'message':'No matches for user'}), 200, {'ContentType':'application/json'}

        # convert response to 
        rowdata = []

        
        # iterate over the matches
        column_names = [i[0] for i in cursor.description]
        for row in res:
            #print(row)
            data = {}
            for i in range(len(column_names)):
                data.update({str(column_names[i]) : row[i]})
            #print(data)
            rowdata.append(data)
            # add headers as json keys
            
        returnjson = {}
        returnjson.update({"matches" : rowdata})
        returnjson.update({'success' : True})
        
        return returnjson

            # query for the post data

        

        if res is not None:
            #print(res)
            return 'valid'
        else:
            return 'Invalid'