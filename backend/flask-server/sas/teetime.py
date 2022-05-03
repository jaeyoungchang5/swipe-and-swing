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
            #print("Committed")
            return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

        except Exception as e:
            print("Failed to insert")
            print(str(e))
            return json.dumps({'success':False, 'message':'Failed to insert teetime'}), 400, {'ContentType':'application/json'}


@bp.route('/deleteTeetime', methods=('GET', 'POST'))
def deleteTeetime():
    if request.method == 'POST':
        db = get_db()
        cursor = db.cursor()
        teetime_id = request.form["teetime_id"]
        
        query = """
        DELETE FROM teetime
        where teetime_id = :ttid
        """
        data = dict(ttid=teetime_id)

        try:
            cursor.execute(
                query,
                data
            )
            db.commit()
            #print("Committed")
            return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

        except Exception as e:
            print("Failed to insert")
            print(str(e))
            return json.dumps({'success':False, 'message':'Failed to delete teetime'}), 400, {'ContentType':'application/json'}


@bp.route('/getTeetimesAll', methods=('GET', 'POST'))
def getTeetimesAll():
    if request.method == 'POST':
        db = get_db()
        cursor = db.cursor()

        query = """
            select t.teetime_id, t.course_id, t.tt_time, t.tt_date, c.course_name, c.course_description, c.phone_num, c.website 
            from teetime t, course c 
            where t.course_id = c.course_id
            order by tt_date
        """

        res = cursor.execute(
            query
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

        if res is not None:
            returnjson.update({'success' : True})
            return returnjson
        else:
            returnjson.update({'success' : False, 'message' : 'no teetimes found'})
            return returnjson


@bp.route('/getNames', methods=('GET', 'POST'))
def getNames():
    if request.method == 'POST':
        db = get_db()
        cursor = db.cursor()
        ids = request.form["ids"]
        ids = ids.strip('[]')
        ids = ids.split(",")

        returnjson = {}
        names_list = []
        for id in ids:
            if id != 'None':
                data = dict(idbv=id)
                query = """
                    select first_name, last_name 
                    from golfer 
                    where golfer_id = :idbv
                """
                res = cursor.execute(
                    query,
                    data
                ).fetchone()

                if res is None:
                    returnjson.update({'success' : False, 'message' : 'no teetimes found'})
                    return returnjson

                first_name = res[0]
                last_name = res[1]
                name = first_name + ' ' + last_name
                names_list.append(name)
    
            else:
                names_list.append('None')

        returnjson.update({'names' : names_list})
        returnjson.update({'success' : True})
        return returnjson
   