-- Test data for MDD Database
-- Insert order follows foreign key dependencies

-- 1. Independent tables (no foreign keys)

-- Roles
INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Administrator', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(2, 'Manager', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(3, 'Operator', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(4, 'Viewer', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL);

-- Users
INSERT INTO `users` (`id`, `name`, `lastname`, `phone`, `address`, `email`, `password`, `active`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Juan', 'Pérez', '555-0101', 'Calle Principal 123', 'juan.perez@email.com', '$2b$10$hashedpassword1', 1, '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(2, 'María', 'González', '555-0102', 'Avenida Central 456', 'maria.gonzalez@email.com', '$2b$10$hashedpassword2', 1, '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(3, 'Carlos', 'López', '555-0103', 'Plaza Mayor 789', 'carlos.lopez@email.com', '$2b$10$hashedpassword3', 1, '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL);

-- User Roles
INSERT INTO `users_roles` (`UserId`, `RoleId`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(2, 2, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(3, 3, '2024-01-01 00:00:00', '2024-01-01 00:00:00');

-- Accounts
INSERT INTO `accounts` (`id`, `name`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Cuenta Principal', 'Cuenta principal de la empresa', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(2, 'Cuenta de Ahorros', 'Cuenta de ahorros para emergencias', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(3, 'Cuenta de Inversión', 'Cuenta para inversiones a largo plazo', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL);

-- Types
INSERT INTO `types` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Ingreso', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(2, 'Egreso', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(3, 'Transferencia', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL);

-- Methods
INSERT INTO `methods` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Efectivo', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(2, 'Transferencia Bancaria', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(3, 'Tarjeta de Crédito', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(4, 'Cheque', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL);

-- Brands
INSERT INTO `brands` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Toyota', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(2, 'Honda', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(3, 'Ford', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(4, 'Chevrolet', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(5, 'Nissan', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL);

-- Models
INSERT INTO `models` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Corolla', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(2, 'Civic', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(3, 'Focus', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(4, 'Cruze', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(5, 'Sentra', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL);

-- States
INSERT INTO `states` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Nuevo', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(2, 'Usado - Excelente', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(3, 'Usado - Bueno', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(4, 'Usado - Regular', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(5, 'Dañado', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL);

-- Products
INSERT INTO `products` (`id`, `name`, `unit`, `isTool`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Aceite de Motor 5W-30', 'Litro', 0, '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(2, 'Filtro de Aceite', 'Unidad', 0, '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(3, 'Pastillas de Freno', 'Juego', 0, '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(4, 'Llanta 205/55R16', 'Unidad', 0, '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(5, 'Llave de Torque', 'Unidad', 1, '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(6, 'Gato Hidráulico', 'Unidad', 1, '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL);

-- Recipes
INSERT INTO `recipes` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Cambio de Aceite', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(2, 'Revisión de Frenos', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(3, 'Cambio de Llantas', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(4, 'Mantenimiento General', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL);

-- Operators
INSERT INTO `operators` (`id`, `name`, `lastname`, `phone`, `address`, `avatar`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Roberto', 'Martínez', '555-0201', 'Calle Secundaria 321', 'avatar1.jpg', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(2, 'Ana', 'Rodríguez', '555-0202', 'Avenida Norte 654', 'avatar2.jpg', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(3, 'Luis', 'Fernández', '555-0203', 'Plaza Sur 987', 'avatar3.jpg', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL);

-- Clients
INSERT INTO `clients` (`id`, `name`, `lastname`, `phone`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Pedro', 'García', '555-0301', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(2, 'Laura', 'Hernández', '555-0302', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(3, 'Miguel', 'Torres', '555-0303', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(4, 'Sofia', 'Morales', '555-0304', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL);

-- 2. Dependent tables (with foreign keys)

-- Vehicles
INSERT INTO `vehicles` (`id`, `license_plate`, `created_at`, `updated_at`, `deleted_at`, `ModelId`, `BrandId`) VALUES
(1, 'ABC-123', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL, 1, 1),
(2, 'DEF-456', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL, 2, 2),
(3, 'GHI-789', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL, 3, 3),
(4, 'JKL-012', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL, 4, 4),
(5, 'MNO-345', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL, 5, 5);

-- Clients Vehicles
INSERT INTO `clients_vehicles` (`ClientId`, `VehicleId`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(2, 2, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(3, 3, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(4, 4, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(1, 5, '2024-01-01 00:00:00', '2024-01-01 00:00:00');

-- Stocks
INSERT INTO `stocks` (`id`, `total_quantity`, `minimum_quantity`, `created_at`, `updated_at`, `UserId`, `ProductId`) VALUES
(1, 50, 10, '2024-01-01 00:00:00', '2024-01-01 00:00:00', 1, 1),
(2, 30, 5, '2024-01-01 00:00:00', '2024-01-01 00:00:00', 1, 2),
(3, 20, 3, '2024-01-01 00:00:00', '2024-01-01 00:00:00', 2, 3),
(4, 40, 8, '2024-01-01 00:00:00', '2024-01-01 00:00:00', 2, 4),
(5, 10, 2, '2024-01-01 00:00:00', '2024-01-01 00:00:00', 3, 5),
(6, 5, 1, '2024-01-01 00:00:00', '2024-01-01 00:00:00', 3, 6);

-- Stock Details
INSERT INTO `stock_details` (`id`, `quantity`, `price`, `entry_date`, `picture`, `created_at`, `updated_at`, `deleted_at`, `BrandId`, `StateId`, `StockId`) VALUES
(1, 25, 15000, '2024-01-15 10:00:00', 'aceite1.jpg', '2024-01-15 10:00:00', '2024-01-15 10:00:00', NULL, 1, 1, 1),
(2, 25, 12000, '2024-01-20 14:30:00', 'aceite2.jpg', '2024-01-20 14:30:00', '2024-01-20 14:30:00', NULL, 2, 1, 1),
(3, 15, 8000, '2024-01-10 09:15:00', 'filtro1.jpg', '2024-01-10 09:15:00', '2024-01-10 09:15:00', NULL, 1, 1, 2),
(4, 15, 7500, '2024-01-25 16:45:00', 'filtro2.jpg', '2024-01-25 16:45:00', '2024-01-25 16:45:00', NULL, 2, 1, 2),
(5, 10, 45000, '2024-01-12 11:20:00', 'frenos1.jpg', '2024-01-12 11:20:00', '2024-01-12 11:20:00', NULL, 3, 1, 3),
(6, 10, 42000, '2024-01-18 13:10:00', 'frenos2.jpg', '2024-01-18 13:10:00', '2024-01-18 13:10:00', NULL, 4, 1, 3),
(7, 20, 120000, '2024-01-05 08:30:00', 'llanta1.jpg', '2024-01-05 08:30:00', '2024-01-05 08:30:00', NULL, 1, 1, 4),
(8, 20, 110000, '2024-01-22 15:25:00', 'llanta2.jpg', '2024-01-22 15:25:00', '2024-01-22 15:25:00', NULL, 2, 1, 4),
(9, 5, 85000, '2024-01-08 12:00:00', 'llave1.jpg', '2024-01-08 12:00:00', '2024-01-08 12:00:00', NULL, 5, 2, 5),
(10, 3, 150000, '2024-01-14 17:40:00', 'gato1.jpg', '2024-01-14 17:40:00', '2024-01-14 17:40:00', NULL, 3, 2, 6);

-- Recipes Stock Details Products
INSERT INTO `recipes_stock_details_products` (`RecipeId`, `StockDetailId`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(1, 3, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(2, 5, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(3, 7, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(4, 1, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(4, 3, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(4, 5, '2024-01-01 00:00:00', '2024-01-01 00:00:00');

-- Services
INSERT INTO `services` (`id`, `date`, `created_at`, `updated_at`, `deleted_at`, `RecipeId`, `VehicleId`) VALUES
(1, '2024-01-15 09:00:00', '2024-01-15 09:00:00', '2024-01-15 09:00:00', NULL, 1, 1),
(2, '2024-01-16 10:30:00', '2024-01-16 10:30:00', '2024-01-16 10:30:00', NULL, 2, 2),
(3, '2024-01-17 14:15:00', '2024-01-17 14:15:00', '2024-01-17 14:15:00', NULL, 3, 3),
(4, '2024-01-18 11:45:00', '2024-01-18 11:45:00', '2024-01-18 11:45:00', NULL, 4, 4),
(5, '2024-01-19 16:20:00', '2024-01-19 16:20:00', '2024-01-19 16:20:00', NULL, 1, 5);

-- Services Operators
INSERT INTO `services_operators` (`ServiceId`, `OperatorId`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-01-15 09:00:00', '2024-01-15 09:00:00'),
(1, 2, '2024-01-15 09:00:00', '2024-01-15 09:00:00'),
(2, 2, '2024-01-16 10:30:00', '2024-01-16 10:30:00'),
(3, 3, '2024-01-17 14:15:00', '2024-01-17 14:15:00'),
(4, 1, '2024-01-18 11:45:00', '2024-01-18 11:45:00'),
(4, 3, '2024-01-18 11:45:00', '2024-01-18 11:45:00'),
(5, 2, '2024-01-19 16:20:00', '2024-01-19 16:20:00');

-- Services Stock Details Additional Products
INSERT INTO `services_stock_details_additional_products` (`ServiceId`, `StockDetailId`, `created_at`, `updated_at`) VALUES
(1, 2, '2024-01-15 09:00:00', '2024-01-15 09:00:00'),
(2, 6, '2024-01-16 10:30:00', '2024-01-16 10:30:00'),
(3, 8, '2024-01-17 14:15:00', '2024-01-17 14:15:00'),
(4, 4, '2024-01-18 11:45:00', '2024-01-18 11:45:00'),
(5, 2, '2024-01-19 16:20:00', '2024-01-19 16:20:00');

-- Transactions
INSERT INTO `transactions` (`id`, `date`, `amount`, `description`, `dolar_rate`, `name`, `created_at`, `updated_at`, `deleted_at`, `UserId`, `AccountId`, `TypeId`, `MethodId`) VALUES
(1, '2024-01-15 10:00:00', 50000, 'Venta de servicio cambio de aceite', 3800, 'Servicio Cambio Aceite', '2024-01-15 10:00:00', '2024-01-15 10:00:00', NULL, 1, 1, 1, 1),
(2, '2024-01-16 11:00:00', 75000, 'Venta de servicio revisión de frenos', 3800, 'Servicio Revisión Frenos', '2024-01-16 11:00:00', '2024-01-16 11:00:00', NULL, 2, 1, 1, 2),
(3, '2024-01-17 15:00:00', 200000, 'Compra de llantas nuevas', 3800, 'Compra Llantas', '2024-01-17 15:00:00', '2024-01-17 15:00:00', NULL, 1, 2, 2, 2),
(4, '2024-01-18 12:00:00', 120000, 'Venta de servicio cambio de llantas', 3800, 'Servicio Cambio Llantas', '2024-01-18 12:00:00', '2024-01-18 12:00:00', NULL, 3, 1, 1, 3),
(5, '2024-01-19 17:00:00', 30000, 'Compra de herramientas', 3800, 'Compra Herramientas', '2024-01-19 17:00:00', '2024-01-19 17:00:00', NULL, 2, 2, 2, 1);

-- Transactions Methods
INSERT INTO `transactions_methods` (`TransactionId`, `MethodId`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-01-15 10:00:00', '2024-01-15 10:00:00'),
(2, 2, '2024-01-16 11:00:00', '2024-01-16 11:00:00'),
(3, 2, '2024-01-17 15:00:00', '2024-01-17 15:00:00'),
(4, 3, '2024-01-18 12:00:00', '2024-01-18 12:00:00'),
(5, 1, '2024-01-19 17:00:00', '2024-01-19 17:00:00');

-- User Roles (additional entries)
INSERT INTO `user_roles` (`userId`, `roleId`, `created_at`, `updated_at`) VALUES
(1, 2, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(2, 3, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(3, 4, '2024-01-01 00:00:00', '2024-01-01 00:00:00');
