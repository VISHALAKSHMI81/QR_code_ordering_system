from flask import Blueprint, jsonify
from ..extensions import db

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return jsonify({"message": "Welcome to the QR Code Ordering System API"})

@main_bp.route('/seed')
def seed():
    from ..models import Product, Admin
    # Automatically create tables if they don't exist
    db.create_all()
    
    # Create Admin
    if not Admin.query.filter_by(username='admin@gmail.com').first():
        admin = Admin(username='admin@gmail.com')
        admin.set_password('Admin')
        db.session.add(admin)
    
    # Create Sample Products
    if Product.query.count() == 0:
        p1 = Product(name='Classic Burger', price=120.0, category='Fast Food', description='Juicy beef burger', is_available=True)
        p2 = Product(name='French Fries', price=80.0, category='Sides', description='Crispy salted fries', is_available=True)
        p3 = Product(name='Coke', price=40.0, category='Beverages', description='Chilled 300ml', is_available=True)
        db.session.add_all([p1, p2, p3])
    
    db.session.commit()
    return jsonify({"message": "Database seeded with admin (admin/admin123) and sample products"})
