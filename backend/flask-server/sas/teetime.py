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
        db = get_db()
        cursor = db.cursor()

        query = """
            SELECT * 
            FROM teetime
        """

        res = cursor.execute(
            query
        ).fetchall()

        if res is not None:
            print(res)
            return res
        else:
            return 'Invalid'


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
            INSERT INTO teetime (course_id, tt_time, tt_date)
            VALUES (:cid, :tim, :dat)
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