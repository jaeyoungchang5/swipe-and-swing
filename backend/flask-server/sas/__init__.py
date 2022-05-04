import os

from flask import Flask
from flask_cors import CORS


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    app.config.from_mapping(
        SECRET_KEY='dev',
        # DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    # from . import db
    # db.init_app(app)
    
    from . import auth
    app.register_blueprint(auth.bp)

    from . import profile
    app.register_blueprint(profile.bp)

    from . import post
    app.register_blueprint(post.bp)

    from . import swipe
    app.register_blueprint(swipe.bp)

    from . import match
    app.register_blueprint(match.bp)
    
    from . import teetime
    app.register_blueprint(teetime.bp)

    from . import search
    app.register_blueprint(search.bp)

    return app