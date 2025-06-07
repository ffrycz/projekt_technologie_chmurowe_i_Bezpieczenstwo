from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String

db = SQLAlchemy()

class Post(db.Model):
    __tablename__='posts'
    id = Column(Integer, primary_key=True)
    author = Column(String(64), nullable=False)
    code = Column(String(128), nullable=False)
    description = Column(String(512), nullable=False)