import functools
from xml.etree.ElementTree import tostring

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from sas.db import get_db

import json

bp = Blueprint('profile', __name__, url_prefix='/profile')

@bp.route('/getInfo', methods=('GET', 'POST'))
def getInfo():
    if request.method == 'POST':
        golfer_id = request.form['golfer_id']
        db = get_db()
        cursor = db.cursor()

        query = f"SELECT * FROM golfer WHERE golfer_id = :id"
        data = dict(id=golfer_id)
        user = cursor.execute(
            query,
            data
        ).fetchone()
        #print(user)

        if user is None:
            print("golfer not found")
            return json.dumps({'success':False, 'message':'Golfer not found'}), 200, {'ContentType':'application/json'}

        # convert to typescript variable format
        jsonfile = {}
     
        column_names = [i[0] for i in cursor.description]
        #print(column_names)

        for i in range(len(column_names)):
            if column_names[i] != 'PASSWORD':
                jsonfile.update({str(column_names[i]) : user[i]})
        
    return jsonfile


@bp.route('/editInfo', methods=('GET', 'POST'))
def editInfo():
    if request.method == 'POST':
        # move request body into mutable python dict
        user = request.form
        info = {}
        info.update(user)
        print(info)

        # execute update statement for sql
        query = """UPDATE golfer (course_id,username,password) 
        VALUES (:cid,:usr,:pwd)
        where golfer_id = :gid
        """
        data = dict(gid=info["golfer_id"])
        print(data)

        try:
            cursor.execute(
                query,
                data
            )

            db.commit()
            print("Committed")
            
        # except db.IntegrityError:
        #     error = f"User {username} is already registered."
        except Exception as e:
            print("Failed to insert")
            print(str(e))
            return 'invalid'

    return 'valid'