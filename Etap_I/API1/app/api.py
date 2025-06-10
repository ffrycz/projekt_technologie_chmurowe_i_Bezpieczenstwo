from flask import Flask, request, jsonify, g
from db_connector import db, Post
from auth import keycloak_protect

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:superSecret@db:3306/posts_db'
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

@app.route("/api/posts/<int:id>", methods=['DELETE'])
@keycloak_protect
def delete_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify({"error": "Post not found"}), 404
    
    user = g.user.get("preferred_username")
    roles = g.user.get("realm_access", {}).get("roles", [])

    if not (("verified_company" in roles and post.author == user) or "admin" in roles):
        return jsonify({"error": "Unauthorized"}), 403
    
    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": f"Post with id {id} deleted"}), 200
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)