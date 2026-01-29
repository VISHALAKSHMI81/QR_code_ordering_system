from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models import Product

products_bp = Blueprint('products', __name__)

@products_bp.route('/', methods=['GET'])
def get_all_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@products_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict())

@products_bp.route('/', methods=['POST'])
def create_product():
    data = request.json
    new_product = Product(
        name=data['name'],
        image=data.get('image'),
        price=data['price'],
        category=data['category'],
        description=data.get('description'),
        is_available=data.get('is_available', True)
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201

@products_bp.route('/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.json
    
    product.name = data.get('name', product.name)
    product.image = data.get('image', product.image)
    product.price = data.get('price', product.price)
    product.category = data.get('category', product.category)
    product.description = data.get('description', product.description)
    product.is_available = data.get('is_available', product.is_available)
    
    db.session.commit()
    return jsonify(product.to_dict())

@products_bp.route('/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"})
