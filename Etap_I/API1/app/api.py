from flask import Flask, request, jsonify
from db_connector import db, Post
from auth import keycloak_protect

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:secret@db:3306/posts_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Chroniony endpoint
@app.route("/api/allPosts", methods=['GET'])
@keycloak_protect
def get_all_posts():
    posts = Post.query.all()
    return jsonify([{
        "id": post.id,
        "author": post.author,
        "title": post.title,
        "description": post.description
    } for post in posts])

@app.route("/api/createPost", methods=["POST"])
@keycloak_protect
def create_post():
    data = request.get_json()
    new_post = Post(
        author=data["author"],
        title=data["code"],
        description=data["description"]
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "Post created"}), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)