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
        # print(info)

        db = get_db()
        cursor = db.cursor()

        # execute update statement for sql
        
        data = {}
        try:
            data = dict(gid=info["golfer_id"],fn=info["first_name"],ln=info["last_name"],ag=info["age"],rat=info["rating"],pn=info["phone_num"],hc=info["handicap"],lat=info["latitude"],lon=info["longitude"])
        except Exception as e:
            print("Failed to create dict")
            print(str(e))
            return json.dumps({'success':False, 'message':'Missing user field', 'missing':str(e)}), 400, {'ContentType':'application/json'}
        
        # print(data)
        query = """UPDATE golfer
        SET first_name = :fn, last_name = :ln, age = :ag, rating = :rat, phone_num = :pn, handicap = :hc, latitude = :lat, longitude = :lon
        wHERE golfer_id = :gid
        """

        try:
            cursor.execute(
                query,
                data
            )

            db.commit()
            print("Committed")
            return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
            
        # except db.IntegrityError:
        #     error = f"User {username} is already registered."
        except Exception as e:
            #print("Failed to insert")
            #print(str(e))
            return json.dumps({'success':False, 'message':'Insert Failed'}), 400, {'ContentType':'application/json'}
