import functools
from xml.etree.ElementTree import tostring

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from sas.db import get_db

import json

bp = Blueprint('teetime', __name__, url_prefix='/teetime')

@bp.route('/getTeetimes', methods=('GET', 'POST'))
def getTeetimes():
    if request.method == 'POST':
        course_id = request.form["course_id"]
        tt_date = request.form["tt_date"]
        db = get_db()
        cursor = db.cursor()

        data = dict(cid=course_id, dat=tt_date)
        query = """
            SELECT * 
            FROM teetime
            WHERE tt_date = :dat and course_id = :cid
            ORDER BY tt_time
        """

        res = cursor.execute(
            query,
            data
        ).fetchall()

        # iterate over teetimes from result of query
        rowdata = []
        for row in res:
            data = {}
            column_names = [i[0] for i in cursor.description]
            for i in range(len(column_names)):
                data.update({str(column_names[i]) : row[i]})
            rowdata.append(data)

        returnjson = {}
        returnjson.update({'teetimes' : rowdata})


        if len(res) != 0:
            returnjson.update({'success' : True})
            return returnjson
        else:
            returnjson.update({'success' : False, 'message' : 'no teetimes found'})
            return returnjson


@bp.route('/uploadTeetime', methods=('GET', 'POST'))
def uploadTeetime():
    if request.method == 'POST':
        course_id = request.form["course_id"]
        tt_time = request.form["tt_time"]
        tt_date = request.form["tt_date"]
        db = get_db()
        cursor = db.cursor()

        data = dict(cid=course_id, tim=tt_time, dat=tt_date)
        query = """
            INSERT INTO teetime (course_id, golfer1_id, golfer2_id, golfer3_id, golfer4_id, tt_time, tt_date)
            VALUES (:cid, NULL, NULL, NULL, NULL, :tim, :dat)
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
            return json.dumps({'success':False, 'message':'Failed to insert teetime'}), 400, {'ContentType':'application/json'}