const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const method = event.httpMethod;  // Detect HTTP method (GET, POST, PUT, DELETE)
    const { userId, textField, bookingId } = JSON.parse(event.body || '{}');  // Request data (if present)
    let response;

    // Establish MySQL connection
    const connection = await mysql.createConnection({
        host: 'database-1.cjicq0e2onjk.eu-west-2.rds.amazonaws.com',
        user: 'admin',
        password: 'yQEmAPEqmUtAX3XGy9wK',
        database: 'dissertation'
    });

    try {
        switch (method) {
            case 'POST': // Create
                response = await connection.execute(
                    'INSERT INTO test_table (test_field, user_id) VALUES (?, ?)',
                    [textField, userId]
                );
                return formatResponse(200, 'Data inserted successfully', response);

            case 'GET': // Read
                // Assume userId is passed via query parameters for GET requests
                const userIdFromQuery = event.queryStringParameters.userId;
                const [rows] = await connection.execute(
                    'SELECT * FROM test_table WHERE user_id = ?',
                    [userIdFromQuery]
                );
                return formatResponse(200, 'Data fetched successfully', rows);

            case 'PUT': // Update
                response = await connection.execute(
                    'UPDATE test_table SET test_field = ? WHERE user_id = ?',
                    [textField, userId]
                );
                return formatResponse(200, 'Data updated successfully', response);

            case 'DELETE': // Delete
                response = await connection.execute(
                    'DELETE FROM test_table WHERE user_id = ?',
                    [userId]
                );
                return formatResponse(200, 'Data deleted successfully', response);

            default:
                return formatResponse(400, 'Unsupported HTTP method');
        }
    } catch (error) {
        console.error('Error:', error);
        return formatResponse(500, 'Internal Server Error', error.message);
    } finally {
        connection.end();
    }
};

// Helper to format responses
const formatResponse = (statusCode, message, data) => {
    return {
        statusCode,
        body: JSON.stringify({
            message,
            data
        }),
    };
};
