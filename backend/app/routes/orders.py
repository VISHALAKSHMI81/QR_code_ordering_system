from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models import Order, OrderItem, Product

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/', methods=['POST'])
def place_order():
    data = request.json
    # data: { table_id: str, items: [ {product_id: int, quantity: int} ], payment_method: str }
    
    new_order = Order(
        table_id=data['table_id'],
        payment_method=data.get('payment_method', 'Cash'),
        status='Pending'
    )
    db.session.add(new_order)
    db.session.flush() # To get the order ID
    
    total_amount = 0
    for item_data in data['items']:
        product = Product.query.get_or_404(item_data['product_id'])
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=product.id,
            quantity=item_data['quantity'],
            price=product.price
        )
        total_amount += product.price * item_data['quantity']
        db.session.add(order_item)
    
    new_order.total_amount = total_amount
    new_order.tax = total_amount * 0.05 # Assuming 5% tax
    new_order.total_amount += new_order.tax
    
    db.session.commit()
    return jsonify(new_order.to_dict()), 201

@orders_bp.route('/', methods=['GET'])
def get_all_orders():
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return jsonify([order.to_dict() for order in orders])

@orders_bp.route('/<int:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.json
    order.status = data.get('status', order.status)
    db.session.commit()
    return jsonify(order.to_dict())
