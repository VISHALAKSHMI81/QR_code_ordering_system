from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models import Admin
import jwt
import datetime
import os

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    admin = Admin.query.filter_by(username=data['username']).first()
    
    if admin and admin.check_password(data['password']):
        token = jwt.encode({
            'admin_id': admin.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, os.environ.get('SECRET_KEY', 'dev-secret-key'), algorithm="HS256")
        
        return jsonify({'token': token})
    
    return jsonify({'message': 'Invalid credentials'}), 401

# Add a route to create initial admin if none exists (for development)
@auth_bp.route('/init-admin', methods=['POST'])
def init_admin():
    if Admin.query.first():
        return jsonify({'message': 'Admin already exists'}), 400
        
    data = request.json
    new_admin = Admin(username=data['username'])
    new_admin.set_password(data['password'])
    db.session.add(new_admin)
    db.session.commit()
    return jsonify({'message': 'Admin created successfully'}), 201
