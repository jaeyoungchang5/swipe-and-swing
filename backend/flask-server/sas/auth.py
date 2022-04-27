import functools
from xml.etree.ElementTree import tostring

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from sas.db import get_db

import json

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/registerGolfer', methods=('GET', 'POST'))
def registerGolfer():
    if request.method == 'POST':
        # store data from 
        username = request.form['username']
        password = request.form['password']
        first_name = request.form['first_name']
        last_name = request.form['last_name']

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
        
        # check that the username is not already registered
        query = """SELECT * FROM courseadmin WHERE username = :usr"""
        print(query)
        data = dict(usr=username)
        res = cursor.execute(
            query,
            data
        ).fetchone()
        # check if result exists
        print(res)
        if res is not None:
            print("Username already taken")
            insert = False
            return json.dumps({'success':False, 'message':'Username already taken'}), 200, {'ContentType':'application/json'}
        else:
            print("Username available")
            insert = True

        #query = 'INSERT INTO course (username, password) VALUES (?, ?)' + (username, generate_password_hash(password))
        query = """INSERT INTO courseadmin (course_id,username,password) VALUES (:cid,:usr,:pwd)"""
        data = dict(cid=course_id, usr=username, pwd=password)
        
        if error is None and insert is True:
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

        flash(error)

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


@bp.route('/loginCourse', methods=('GET', 'POST'))
def loginCourse():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        cursor = db.cursor()
        error = None

        # new
        query = f"SELECT password FROM courseadmin WHERE username = :usr"
        data = dict(usr=username)
        user = cursor.execute(
            query,
            data
        ).fetchone()

        if user is None:
            error = 'Incorrect username.'
        elif user[0] != password:
            error = 'Incorrect password.'
            print("passwords don't match, unsuccessful login")
            return json.dumps({'success':False}), 200, {'ContentType':'application/json'}
        else:
            print("passwords match, successful login")
            return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


        
        flash(error)

    