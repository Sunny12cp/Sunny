<?php
// Check if a file was uploaded
if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
    // Specify the target directory where you want to save the uploaded files
    $targetDirectory = 'uploads/';

    // Create the target directory if it doesn't exist
    if (!file_exists($targetDirectory)) {
        mkdir($targetDirectory, 0777, true);
    }

    // Generate a unique filename for the uploaded file
    $fileName = uniqid() . '_' . basename($_FILES['file']['name']);
    $targetPath = $targetDirectory . $fileName;

    // Move the uploaded file to the target directory
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetPath)) {
        // File upload successful
        echo json_encode(['status' => 'success', 'fileName' => $fileName]);
    } else {
        // Failed to move the uploaded file
        echo json_encode(['status' => 'error', 'message' => 'Failed to move the uploaded file.']);
    }
} else {
    // File upload failed
    echo json_encode(['status' => 'error', 'message' => 'File upload failed.']);
}
?>
