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
        teetime = request.form["date"]
        db = get_db()
        cursor = db.cursor()

        query = """
            INSERT INTO teetime

        """

        res = cursor.execute(
            query
        ).fetchall()

        if res is not None:
            print(res)
            return res
        else:
            return 'Invalid'