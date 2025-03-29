
<?php
header('Content-Type: application/json');

// Include database connection
require_once '../database/db_connect.php';

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['cartItems']) || empty($data['cartItems']) ||
    !isset($data['deliveryType']) ||
    !isset($data['paymentMethod']) ||
    !isset($data['subtotal']) ||
    !isset($data['total'])) {
    
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

try {
    $db->beginTransaction();
    
    // Insert order
    $orderStmt = $db->prepare("
        INSERT INTO orders 
        (user_id, delivery_type, address_id, subtotal, delivery_fee, service_fee, total, payment_method)
        VALUES 
        (:user_id, :delivery_type, :address_id, :subtotal, :delivery_fee, :service_fee, :total, :payment_method)
    ");
    
    $userId = isset($data['userId']) ? $data['userId'] : null;
    $addressId = isset($data['addressId']) ? $data['addressId'] : null;
    
    $orderStmt->bindParam(':user_id', $userId);
    $orderStmt->bindParam(':delivery_type', $data['deliveryType']);
    $orderStmt->bindParam(':address_id', $addressId);
    $orderStmt->bindParam(':subtotal', $data['subtotal']);
    $orderStmt->bindParam(':delivery_fee', $data['deliveryFee']);
    $orderStmt->bindParam(':service_fee', $data['serviceFee']);
    $orderStmt->bindParam(':total', $data['total']);
    $orderStmt->bindParam(':payment_method', $data['paymentMethod']);
    
    $orderStmt->execute();
    $orderId = $db->lastInsertId();
    
    // Insert order items
    $itemStmt = $db->prepare("
        INSERT INTO order_items
        (order_id, menu_item_id, quantity, price, special_instructions)
        VALUES
        (:order_id, :menu_item_id, :quantity, :price, :special_instructions)
    ");
    
    foreach ($data['cartItems'] as $item) {
        $itemStmt->bindParam(':order_id', $orderId);
        $itemStmt->bindParam(':menu_item_id', $item['id']);
        $itemStmt->bindParam(':quantity', $item['quantity']);
        $itemStmt->bindParam(':price', $item['price']);
        $specialInstructions = isset($item['specialInstructions']) ? $item['specialInstructions'] : null;
        $itemStmt->bindParam(':special_instructions', $specialInstructions);
        
        $itemStmt->execute();
    }
    
    $db->commit();
    
    echo json_encode([
        'success' => true,
        'orderId' => $orderId,
        'message' => 'Order placed successfully'
    ]);
} catch(PDOException $e) {
    $db->rollBack();
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
