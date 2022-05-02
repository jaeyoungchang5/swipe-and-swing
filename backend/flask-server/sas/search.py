import functools
from xml.etree.ElementTree import tostring

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from regex import R
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


        query = """
        SELECT * FROM course
        WHERE UPPER(course_name) like UPPER(%:ss%)
        """
        data = dict(ss=searchString)

        res = cursor.execute(query, data).fetchall()
        
        print(res)
        returnjson = {}
        if len(res) != 0:
            returnjson.update({'success' : True})
            return returnjson
        else:
            returnjson.update({'success' : False, 'message' : 'no teetimes found'})
            return returnjson