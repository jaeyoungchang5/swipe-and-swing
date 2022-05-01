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
            print(data)
        except Exception as e:
            print("Failed to create dict")
            print(str(e))
            return json.dumps({'success':False, 'message':'Missing user field', 'missing':str(e)}), 400, {'ContentType':'application/json'}
        query = """INSERT INTO post (poster_id,is_drinking,is_betting,is_music,transport,num_holes,num_people,duration) VALUES (:pid,:id,:ib,:im,:tp,:nh,:np,:du)"""
        
        # attempt query
        print(query)
        try:
            cursor.execute(
                query,
                data
            )
            db.commit()
            print("Committed")
            return json.dumps({'success':True}), 400, {'ContentType':'application/json'}

        except Exception as e:
            print("Failed to insert")
            print(str(e))
            return json.dumps({'success':False, 'message':'Failed to Insert'}), 200, {'ContentType':'application/json'}

        # TODO: create match rows for all users in system
        
