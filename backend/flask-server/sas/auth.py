import functools
from xml.etree.ElementTree import tostring

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from sas.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register-course', methods=('GET','POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
    if request.method == 'GET':
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Golfer")
        res = cursor.fetchall()
        print(res)
        # for row in cursor.fetchall():
        #     res.append(row)

    return str(res)

@bp.route('/register-golfer', methods=('GET','POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
    if request.method == 'GET':
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Golfer")
        res = cursor.fetchall()
        print(res)
        # for row in cursor.fetchall():
        #     res.append(row)

    return str(res)