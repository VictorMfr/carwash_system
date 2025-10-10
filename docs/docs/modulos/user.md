---
sidebar_position: 4
---

# Módulo de Usuarios

El módulo de Usuarios te permite gestionar todos los usuarios del sistema, sus roles y permisos.

## Características principales

- **Gestión de usuarios**: Crear, editar y eliminar usuarios
- **Sistema de roles**: Asignar roles y permisos
- **Autenticación**: Control de acceso al sistema
- **Perfiles de usuario**: Información personal y preferencias
- **Auditoría**: Seguimiento de actividades de usuarios

## Acceso al módulo

1. En el menú lateral, haz clic en **User**
2. Serás dirigido a la página de gestión de usuarios

## Gestión de usuarios

### Crear un nuevo usuario

1. Haz clic en **"Nuevo Usuario"**
2. Completa el formulario:
   - **Nombre**: Nombre completo del usuario
   - **Email**: Correo electrónico (será el usuario de login)
   - **Contraseña**: Contraseña inicial
   - **Rol**: Selecciona el rol del usuario
   - **Activo**: Si el usuario puede acceder al sistema
   - **Teléfono**: Número de contacto (opcional)
   - **Dirección**: Dirección del usuario (opcional)

3. Guarda el usuario

### Editar usuario existente

1. En la lista de usuarios, haz clic en editar
2. Modifica la información necesaria
3. Guarda los cambios

### Desactivar usuario

1. Selecciona el usuario
2. Haz clic en **"Desactivar"**
3. El usuario no podrá acceder al sistema

## Sistema de roles

### Roles disponibles

- **Administrador**: Acceso completo al sistema
- **Gerente**: Acceso a la mayoría de módulos
- **Empleado**: Acceso limitado según su área
- **Vendedor**: Acceso a ventas y clientes
- **Técnico**: Acceso a servicios y mantenimientos

### Asignar roles

1. Selecciona un usuario
2. Haz clic en **"Cambiar Rol"**
3. Selecciona el nuevo rol
4. Confirma el cambio

### Configurar permisos

1. Ve a **User** > **Roles y Permisos**
2. Para cada rol, configura:
   - **Módulos accesibles**: Qué módulos puede ver
   - **Acciones permitidas**: Qué puede hacer en cada módulo
   - **Restricciones**: Limitaciones específicas

## Perfiles de usuario

### Ver perfil

1. Haz clic en tu avatar en la esquina superior derecha
2. Selecciona **"Mi Perfil"**
3. Aquí podrás ver y editar:
   - Información personal
   - Preferencias del sistema
   - Historial de actividades

### Actualizar información

1. En tu perfil, haz clic en **"Editar"**
2. Modifica la información:
   - **Nombre**: Nombre completo
   - **Email**: Correo electrónico
   - **Teléfono**: Número de contacto
   - **Dirección**: Dirección personal
   - **Foto**: Foto de perfil

3. Guarda los cambios

### Cambiar contraseña

1. En tu perfil, ve a **"Seguridad"**
2. Ingresa:
   - **Contraseña actual**: Tu contraseña actual
   - **Nueva contraseña**: Nueva contraseña
   - **Confirmar contraseña**: Repite la nueva contraseña

3. Guarda la nueva contraseña

## Preferencias del sistema

### Configurar preferencias

1. En tu perfil, ve a **"Preferencias"**
2. Configura:
   - **Idioma**: Idioma de la interfaz
   - **Zona horaria**: Tu zona horaria
   - **Formato de fecha**: Cómo mostrar las fechas
   - **Tema**: Tema claro u oscuro
   - **Notificaciones**: Qué notificaciones recibir

### Configurar notificaciones

1. Ve a **"Notificaciones"**
2. Selecciona qué notificaciones recibir:
   - **Email**: Notificaciones por correo
   - **Sistema**: Notificaciones en la aplicación
   - **SMS**: Notificaciones por mensaje (si está configurado)

## Auditoría y seguimiento

### Ver actividades de usuarios

1. Ve a **User** > **Auditoría**
2. Aquí podrás ver:
   - **Login/Logout**: Cuándo los usuarios acceden
   - **Acciones realizadas**: Qué hacen en el sistema
   - **Cambios importantes**: Modificaciones críticas
   - **Intentos de acceso**: Intentos fallidos de login

### Filtrar actividades

- **Por usuario**: Actividades de un usuario específico
- **Por fecha**: Actividades en un rango de fechas
- **Por tipo**: Tipos específicos de actividades
- **Por módulo**: Actividades en módulos específicos

## Seguridad

### Configurar políticas de contraseñas

1. Ve a **User** > **Configuración** > **Seguridad**
2. Establece:
   - **Longitud mínima**: Mínimo de caracteres
   - **Complejidad**: Requisitos de complejidad
   - **Expiración**: Cuándo expiran las contraseñas
   - **Intentos fallidos**: Límite de intentos

### Configurar autenticación

1. En **Configuración** > **Autenticación**
2. Configura:
   - **Doble autenticación**: Requerir 2FA
   - **Sesiones**: Duración de las sesiones
   - **IPs permitidas**: Restricciones por IP
   - **Horarios**: Horarios de acceso

## Consejos para el uso eficiente

- **Asigna roles apropiados**: Cada usuario debe tener solo los permisos necesarios
- **Revisa regularmente la auditoría**: Mantén un control de las actividades
- **Configura notificaciones importantes**: Para cambios críticos en el sistema
- **Mantén actualizada la información**: Especialmente emails y teléfonos
- **Establece políticas de seguridad**: Para proteger la información
- **Capacita a los usuarios**: Asegúrate de que sepan usar el sistema correctamente
