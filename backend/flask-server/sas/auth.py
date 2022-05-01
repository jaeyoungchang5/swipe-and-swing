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
        # get data for query
        username = request.form['username']
        password = request.form['password']
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        age = request.form['age']
        phone_num = request.form['phone_num']
        db = get_db()
        cursor = db.cursor()
        
        # check if username is registered
        query = """SELECT * FROM golfer WHERE username = :usr"""
        data = dict(usr=username)
        res = cursor.execute(
            query,
            data
        ).fetchone()

        if res is not None:
            print("Username already taken")
            insert = False
            return json.dumps({'success':False, 'message':'Username already taken'}), 200, {'ContentType':'application/json'}
        else:
            print("Username available")
            insert = True

        # TODO: check if username is unique 

        # insert the user into db if valid
        query = """INSERT INTO golfer (first_name,last_name,age,username,password,phone_num) VALUES (:fn,:ln,:ag,:usr,:pwd,:pn)"""
        data = dict(fn=first_name, ln=last_name, ag=age, usr=username, pwd=password, pn=phone_num)
        
        if insert is True:
            try:
                cursor.execute(
                    query,
                    data
                )

                db.commit()
                print("Committed")
                
            except Exception as e:
                print("Failed to insert")
                print(str(e))
                return 'invalid'
        
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


@bp.route('/loginGolfer', methods=('GET', 'POST'))
def loginGolfer():
    if request.method == 'POST':
        # get data for query
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        cursor = db.cursor()

        # 
        query = """SELECT password FROM golfer WHERE username = :usr"""
        data = dict(usr=username)
        user = cursor.execute(
            query,
            data
        ).fetchone()

        # TODO: return golfer_id if signin

        if user is None:
            print('Username does not exist')
            return json.dumps({'success':False, 'message':'Username is incorrect'}), 200, {'ContentType':'application/json'}
        elif user[0] != password:
            error = 'Incorrect password.'
            print("passwords don't match, unsuccessful login")
            return json.dumps({'success':False, 'message':'Password is incorrect'}), 200, {'ContentType':'application/json'}
        else:
            print("passwords match, successful login")
            return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

        

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
        #print(query)
        data = dict(usr=username)
        res = cursor.execute(
            query,
            data
        ).fetchone()

        # check if username is registered
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

        query = """SELECT password FROM courseadmin WHERE username = :usr"""
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

    return 'error'
        

    