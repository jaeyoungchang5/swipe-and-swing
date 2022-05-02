import functools
from xml.etree.ElementTree import tostring

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from sas.db import get_db

import json

bp = Blueprint('post', __name__, url_prefix='/post')

@bp.route('/uploadPost', methods=('GET', 'POST'))
def uploadPost():
    if request.method == 'POST':
        # move request body into mutable python dict
        user = request.form
        info = {}
        info.update(user)
        #print(info)

        db = get_db()
        cursor = db.cursor()

        # validate body   
        data = {}
        try:
            data = dict(du=info["duration"],pid=info["poster_id"],id=info["is_drinking"],ib=info["is_betting"],im=info["is_music"],tp=info["transport"],nh=info["num_holes"],np=info["num_people"])
            #print(data)
        except Exception as e:
            print("Failed to create dict")
            print(str(e))
            return json.dumps({'success':False, 'message':'Missing user field', 'missing':str(e)}), 400, {'ContentType':'application/json'}
        query = """INSERT INTO post (poster_id,is_drinking,is_betting,is_music,transport,num_holes,num_people,duration) VALUES (:pid,:id,:ib,:im,:tp,:nh,:np,:du)"""
        
        # attempt query
        #print(query)
        try:
            cursor.execute(
                query,
                data
            )
            db.commit()
            #print("Committed")

        except Exception as e:
            print("Failed to insert")
            print(str(e))
            return json.dumps({'success':False, 'message':'Failed to Insert'}), 200, {'ContentType':'application/json'}


        # create match rows for all users in the system
        # get all swiper_ids that aren't the poster_id
        query = """
        SELECT golfer_id
        FROM golfer
        WHERE golfer_id != :pid
        """
        data = dict(pid=info["poster_id"])
        res = cursor.execute(
            query, 
            data
        ).fetchall()

        swiper_ids = []
        for row in res:
            swiper_ids.append(row[0])

        # insert into match a row for each swiper_id
        for id in swiper_ids:
            
            # get the post_id from post table 
            query = """
            SELECT * FROM
            (select p.post_id from post p where poster_id = :posterid order by post_id desc)
            WHERE rownum = 1
            """
            data = dict(posterid=info["poster_id"])
            
            res = cursor.execute(
                query, data
            ).fetchone()

            post_idvar = res[0]
            
            query = """
            INSERT INTO match (post_id,swiper_id,status)
            VALUES (:postid,:sid,0)
            """
            data = dict(postid=post_idvar,sid=id)

            try:
                cursor.execute(
                    query, data
                )
                db.commit()
                #print("Committed")

            except Exception as e:
                print("Failed to insert")
                print(str(e))
                return json.dumps({'success':False, 'message':'Failed to Insert'}), 200, {'ContentType':'application/json'}


        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
