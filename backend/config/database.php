<?php
/**
 * Database connection configuration for Fit Kats Gym Management System.
 * Uses PDO for safe, prepared-statement queries.
 */

class Database {
    private static ?PDO $instance = null;

    private const HOST = 'localhost';
    private const DB_NAME = 'fit_kats_db';
    private const USERNAME = 'root';
    private const PASSWORD = ''; // Default XAMPP MySQL password is empty
    private const CHARSET = 'utf8mb4';

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $dsn = 'mysql:host=' . self::HOST . ';dbname=' . self::DB_NAME . ';charset=' . self::CHARSET;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];

            try {
                self::$instance = new PDO($dsn, self::USERNAME, self::PASSWORD, $options);
            } catch (PDOException $e) {
                http_response_code(500);
                header('Content-Type: application/json');
                echo json_encode([
                    'success' => false,
                    'message' => 'Database connection failed. Is MySQL running in XAMPP?',
                ]);
                exit;
            }
        }
        return self::$instance;
    }
}