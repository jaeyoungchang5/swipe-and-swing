import functools
from xml.etree.ElementTree import tostring

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from sas.db import get_db

import json

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/registerCourse', methods=('GET', 'POST'))
def registerCourse():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        course_id = request.form['course_id']
        db = get_db()
        cursor = db.cursor()
        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        elif not course_id:
            error = 'Course_id is required.'
        
        query = 'INSERT INTO course (username, password) VALUES (?, ?)' + (username, generate_password_hash(password))
        query = f"INSERT INTO courseadmin (course_id,username,password) VALUES"

        if error is None:
            try:
                cursor.execute(
                    query
                )
                # db.execute(
                #     "INSERT INTO user (username, password) VALUES (?, ?)",
                #     (username, generate_password_hash(password)),
                # )
                res = cursor.fetchall()
                for row in res:
                    print(row)
            except db.IntegrityError:
                error = f"User {username} is already registered."
            # else:
                # return redirect(url_for("auth.login"))

        flash(error)

    return 'valid'

@bp.route('/loginCourse', methods=('GET', 'POST'))
def loginCourse():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        cursor = db.cursor()
        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        
        query = f"SELECT password FROM courseadmin WHERE username = '{username}'"

        if error is None:
            try:
                cursor.execute(
                    query)
                res = cursor.fetchall()
                print('password from request =',password)
                print('password from DB =', res[0][0])
                pwd = (res[0][0])
                if password == pwd:
                    print("passwords match, successful login")
                    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
                else:
                    print("passwords don't match, unsuccessful login")
                    return json.dumps({'success':False}), 200, {'ContentType':'application/json'}
            except db.IntegrityError:
                error = f"User {username} is already registered."

        flash(error)

    