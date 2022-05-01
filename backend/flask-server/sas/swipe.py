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
            SELECT * 
            FROM match
            WHERE status = 0
            and swiper_id = :sid
        """

        res = cursor.execute(
            query,
            data
        ).fetchall()

        if res is None:
            print("no matches")
            return json.dumps({'success':False, 'message':'No matches for user'}), 200, {'ContentType':'application/json'}

        # convert response to 
        jsonfile = {}

        # iterate over the matches
        for row in res:
            print(row)
            match_id = row[0]
            post_id = row[1]
            swiper_id = row[2]
            status = row[3]
            jsonfile


        if res is not None:
            #print(res)
            return 'valid'
        else:
            return 'Invalid'