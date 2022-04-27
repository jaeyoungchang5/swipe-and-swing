# db.py
# Functions to connect to Oracle Database

import cx_Oracle
# cx_Oracle.init_oracle_client(lib_dir="/Users/andrewrocks/oracle/instantclient_19_8")
# connect to database
# script code for debugging, functions to be implemented later
# conn = cx_Oracle.connect('arocks/arocks@54.145.160.33/xe')

# print("Successfully connected to Oracle Database")
# print("Database version:", conn.version)
# print(conn)

# cursor = conn.cursor()
# cursor.execute("SELECT * FROM Golfer")
# for row in cursor.fetchall():
#     print(row)


# import click
from flask import current_app, g
# from flask.cli import with_appcontext

def get_db():
    if 'db' not in g:
        try:
            cx_Oracle.init_oracle_client(lib_dir="/Users/andrewrocks/oracle/instantclient_19_8")
        except:
            print("Already initialized")
        g.db = cx_Oracle.connect('arocks/arocks@54.145.160.33/xe')
        
        # g.db.row_factory = sqlite3.Row

    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()