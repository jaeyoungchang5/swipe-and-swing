import functools
from xml.etree.ElementTree import tostring

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from sas.db import get_db

import json

bp = Blueprint('swipe', __name__, url_prefix='/swipe')

@bp.route('/getMatches', methods=('GET', 'POST'))
def getMatches():
    if request.method == 'POST':
        db = get_db()
        cursor = db.cursor()

        query = """
            SELECT * 
            FROM match
            WHERE status = 0
        """

        res = cursor.execute(
            query
        ).fetchall()

        if res is not None:
            print(res)
            return 'Valid'
        else:
            return 'Invalid'