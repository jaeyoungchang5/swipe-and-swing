import functools
from xml.etree.ElementTree import tostring

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from sas.db import get_db

import json

bp = Blueprint('match', __name__, url_prefix='/match')

@bp.route('/getPotentialMatches', methods=('GET', 'POST'))
def getPotentialMatches():
    if request.method == 'POST':
        db = get_db()
        cursor = db.cursor()

        data = dict(gid=request.form["golfer_id"])

        # find post data
        query = """
        SELECT *
        FROM post
        WHERE poster_id = :gid
        """
        res = cursor.execute(
            query,
            data
        ).fetchone()
       
        if res is None:
            print("no posts")
            return json.dumps({'success':False, 'message':'No posts for user'}), 200, {'ContentType':'application/json'}

        returnjson = {}
        postInfo = {}
        post_id = 0
        # add column names to post info for golfer_id
        column_names = [i[0] for i in cursor.description]
        for i in range(len(column_names)):
            if column_names[i] == 'POST_ID':
                post_id = res[i]
                #print("post id is " + str(post_id))
            postInfo.update({str(column_names[i]) : res[i]})
        
        returnjson.update({'postInfo' : postInfo})

        # find golfers who have swiped right on the post and return their info
        data = dict(pid=post_id)
        query = """
        SELECT m.match_id, m.swiper_id
        FROM match m, post p 
        WHERE m.post_id = p.post_id and p.post_id = :pid and m.status = 3
        """

        res = cursor.execute(
            query,
            data
        ).fetchall()

        print(res)

        # iterate over the rows
        rowdata = []
        for row in res:
            # query the golfer data 
            match_id = row[0]
            swiper_id = row[1]
    
            data = dict(gid=swiper_id)
            query = """
            SELECT *
            FROM golfer
            WHERE golfer_id = :gid 
            """
            res = cursor.execute(
                query,
                data
            ).fetchone()

            data = {}
            column_names = [i[0] for i in cursor.description]

            for i in range(len(column_names)):
                data.update({str(column_names[i]) : res[i]})
            data.update({'MATCH_ID' : match_id, 'SWIPER_ID' : swiper_id})
            rowdata.append(data)
            

        returnjson.update({'potentialMatchGolferInfo' : rowdata})

        returnjson.update({'success' : True})
        
        return returnjson


@bp.route('/getAcceptedMatches', methods=('GET', 'POST'))
def getAcceptedMatches():
    if request.method == 'POST':
        db = get_db()
        cursor = db.cursor()

        data = dict(gid=request.form["golfer_id"])

        # find post data
        query = """
        SELECT *
        FROM post
        WHERE poster_id = :gid
        """
        res = cursor.execute(
            query,
            data
        ).fetchone()
       
        if res is None:
            print("no posts")
            return json.dumps({'success':False, 'message':'No posts for user'}), 200, {'ContentType':'application/json'}

        returnjson = {}
        postInfo = {}
        post_id = 0
        # add column names to post info for golfer_id
        column_names = [i[0] for i in cursor.description]
        for i in range(len(column_names)):
            if column_names[i] == 'POST_ID':
                post_id = res[i]
                #print("post id is " + str(post_id))
            postInfo.update({str(column_names[i]) : res[i]})
        
        returnjson.update({'postInfo' : postInfo})

        # find golfers who have swiped right on the post and return their info
        data = dict(pid=post_id)
        query = """
        SELECT swiper_id 
        FROM match m, post p 
        WHERE m.post_id = p.post_id and p.post_id = :pid and m.status = 4
        """

        res = cursor.execute(
            query,
            data
        ).fetchall()

        #print(res)

        # iterate over the rows
        rowdata = []
        for row in res:
            # query the golfer data 
            swiper_id = row[0]
            data = dict(gid=swiper_id)
            query = """
            SELECT *
            FROM golfer
            WHERE golfer_id = :gid 
            """
            res = cursor.execute(
                query,
                data
            ).fetchone()

            data = {}
            column_names = [i[0] for i in cursor.description]

            for i in range(len(column_names)):
                data.update({str(column_names[i]) : res[i]})
            rowdata.append(data)

        returnjson.update({'potentialMatchGolferInfo' : rowdata})

        returnjson.update({'success' : True})
        
        return returnjson


@bp.route('/acceptMatch', methods=('GET', 'POST'))
def acceptMatch():
    if request.method == 'POST':
        db = get_db()
        cursor = db.cursor()

        data = dict(mid=request.form["match_id"])

        query = """
        UPDATE match
        SET status = 4
        WHERE match_id = :mid
        """

        try:
            cursor.execute(
                query,
                data
            )
            db.commit()
            print("Committed")
            return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

        except Exception as e:
            print("Failed to insert")
            print(str(e))
            return json.dumps({'success':False, 'message':'Failed to update status'}), 400, {'ContentType':'application/json'}


@bp.route('/declineMatch', methods=('GET', 'POST'))
def declineMatch():
    if request.method == 'POST':
        db = get_db()
        cursor = db.cursor()

        data = dict(mid=request.form["match_id"])

        query = """
        UPDATE match
        SET status = 2
        WHERE match_id = :mid
        """

        try:
            cursor.execute(
                query,
                data
            )
            db.commit()
            print("Committed")
            return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

        except Exception as e:
            print("Failed to insert")
            print(str(e))
            return json.dumps({'success':False, 'message':'Failed to update status'}), 400, {'ContentType':'application/json'}
