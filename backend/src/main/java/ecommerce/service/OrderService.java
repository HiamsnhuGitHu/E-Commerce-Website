package ecommerce.service;

import ecommerce.entity.CartItem;
import ecommerce.entity.Order;
import ecommerce.entity.OrderItem;
import ecommerce.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartService cartService;

    @Autowired
    public OrderService(OrderRepository orderRepository, CartService cartService) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderByNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber);
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Transactional
    public Order createOrderFromCart(Long userId, String shippingAddress, String paymentMethod) {
        List<CartItem> cartItems = cartService.getCartByUserId(userId);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cannot place order with an empty cart!");
        }

        double total = 0.0;
        for (CartItem item : cartItems) {
            total += item.getProduct().getPrice() * item.getQuantity();
        }

        String orderNumber = "#ORD-2026-" + (1000 + new Random().nextInt(9000));
        Order order = new Order(orderNumber, userId, total, paymentMethod, shippingAddress);

        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem(
                    cartItem.getProduct().getId(),
                    cartItem.getProduct().getName(),
                    cartItem.getProduct().getImage(),
                    cartItem.getProduct().getPrice(),
                    cartItem.getQuantity(),
                    cartItem.getVariant()
            );
            order.addItem(orderItem);
        }

        Order savedOrder = orderRepository.save(order);
        cartService.clearCart(userId);
        return savedOrder;
    }

    // Admin / Seller: Update order delivery status
    public Order updateOrderStatus(Long orderId, String newStatus) {
        return orderRepository.findById(orderId).map(order -> {
            order.setStatus(newStatus);
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
    }

    public long getTotalOrdersCount() {
        return orderRepository.count();
    }

    public double getTotalRevenue() {
        return orderRepository.findAll().stream()
                .mapToDouble(Order::getTotalAmount)
                .sum();
    }
}
