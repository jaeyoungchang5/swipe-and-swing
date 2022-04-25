import functools
from xml.etree.ElementTree import tostring

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from sas.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/registerCourse', methods=('GET', 'POST'))
def registerCourse():
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
        
        print(username)
        print(password)
        query = 'INSERT INTO course'
        query = 'INSERT INTO course (username, password) VALUES (?, ?)' + (username, generate_password_hash(password))


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
        
        # print(username)
        # print(password)
        query = f"SELECT password FROM golfer WHERE username = '{username}'"

        if error is None:
            try:
                cursor.execute(
                    query
                )
                
                
                res = cursor.fetchall()
                pwd = (res[0][0])

                if password == pwd:
                    print("passwords match")
                # print(res)
                # for row in res:
                #     print(row)
            except db.IntegrityError:
                error = f"User {username} is already registered."
            # else:
                # return redirect(url_for("auth.login"))

        flash(error)

    return 'valid'