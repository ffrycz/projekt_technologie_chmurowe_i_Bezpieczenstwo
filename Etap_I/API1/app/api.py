from flask import Flask, request, jsonify
from db_connector import db, Post
from auth import keycloak_protect

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:superSecret@db:3306/posts_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
# @app.before_first_request
# def create_tables():
#     db.create_all()

# Chroniony endpoint
@app.route("/api/allPosts", methods=['GET'])
@keycloak_protect
def get_all_posts():
    posts = Post.query.all()
    return jsonify([{
        "id": post.id,
        "author": post.author,
        "code": post.code,
        "description": post.description
    } for post in posts])

@app.route("/api/createPost", methods=["POST"])
@keycloak_protect
def create_post():
    data = request.get_json()
    new_post = Post(
        author=data["author"],
        code=data["code"],
        description=data["description"]
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "Post created"}), 201

@app.route("/api/posts/<author>", methods=["GET"])
@keycloak_protect
def get_posts_by(author):
    posts = Post.query.filter.filter_by(author=author).all()
    return jsonify([{
        "id": post.id,
        "author": post.author,
        "code": post.code,
        "description": post.description
    } for post in posts])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)