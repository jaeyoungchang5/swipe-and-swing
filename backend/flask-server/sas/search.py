import functools
from xml.etree.ElementTree import tostring

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from sas.db import get_db

import json

bp = Blueprint('search', __name__, url_prefix='/search')

@bp.route('/courses', methods=('GET', 'POST'))
def courses():
    if request.method == 'POST':
        db = get_db()
        cursor = db.cursor()
        searchString = request.form["searchString"]
        
        # if searchString is empty return all
        data = dict(ss=searchString)
        returnjson = {}

        # if the search string is empty, return all courses
        if str(searchString) == '':
            #print("ss is none")

            query = """
            SELECT * FROM course
            """
            res = cursor.execute(
            query
            ).fetchall()

            rowdata = []
            for row in res:
                data = {}
                column_names = [i[0] for i in cursor.description]
                for i in range(len(column_names)):
                    data.update({str(column_names[i]) : row[i]})
                rowdata.append(data)

            returnjson.update({'courses' : rowdata})
            returnjson.update({'success' : True})
            return returnjson

        # if a search string is supplied, use it
        else:
            query = """
            SELECT * FROM course
            WHERE UPPER(course_name) like UPPER(:ss)
            """
            res = cursor.execute(
            query, data
            ).fetchone()

            if res is not None:
                column_names = [i[0] for i in cursor.description]
                for i in range(len(column_names)):
                    data.update({str(column_names[i]) : res[i]})
                
                returnjson.update({'course' : data})
                returnjson.update({'success' : True})
                return returnjson
            else:
                returnjson.update({'success' : False, 'message' : 'search failed'})
                return returnjson

            
@bp.route('/golfers', methods=('GET', 'POST'))
def golfers():
    if request.method == 'POST':
        db = get_db()
        cursor = db.cursor()
        searchString = request.form["searchString"]
        
        # if searchString is empty return all
        data = dict(ss=searchString)
        returnjson = {}

        # if the search string is empty, return all courses
        if str(searchString) == '':
            #print("ss is none")

            query = """
            SELECT * FROM golfer
            """
            res = cursor.execute(
            query
            ).fetchall()

            rowdata = []
            for row in res:
                data = {}
                column_names = [i[0] for i in cursor.description]
                for i in range(len(column_names)):
                    data.update({str(column_names[i]) : row[i]})
                rowdata.append(data)

            returnjson.update({'golfers' : rowdata})
            returnjson.update({'success' : True})
            return returnjson

        # if a search string is supplied, use it
        else:

            query = """
            SELECT * FROM golfer
            WHERE UPPER(username) like UPPER(:ss)
            """
            res = cursor.execute(
            query, data
            ).fetchone()

            if res is not None:
                column_names = [i[0] for i in cursor.description]
                for i in range(len(column_names)):
                    data.update({str(column_names[i]) : res[i]})
                
                returnjson.update({'golfer' : data})
                returnjson.update({'success' : True})
                return returnjson
            else:
                returnjson.update({'success' : False, 'message' : 'search failed'})
                return returnjson
    