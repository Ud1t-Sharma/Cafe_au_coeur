
<?php
header('Content-Type: application/json');

// Include database connection
require_once '../database/db_connect.php';

try {
    // Get all categories
    $categoryStmt = $db->prepare("SELECT * FROM categories ORDER BY name");
    $categoryStmt->execute();
    $categories = $categoryStmt->fetchAll(PDO::FETCH_ASSOC);

    // Get all menu items
    $itemStmt = $db->prepare("SELECT * FROM menu_items ORDER BY category_id, name");
    $itemStmt->execute();
    $menuItems = $itemStmt->fetchAll(PDO::FETCH_ASSOC);

    // Format the response
    $response = [
        'categories' => $categories,
        'menuItems' => $menuItems
    ];

    echo json_encode($response);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
