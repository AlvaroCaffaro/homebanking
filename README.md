# 📌 API de Autenticación y Transferencias Bancarias  

## 📖 Descripción  
Esta API permite la autenticación de usuarios, la creación de cuentas en diferentes monedas extranjeras, la gestión de transferencias bancarias y la búsqueda de cuentas por alias o número de cuenta.  

## 🚀 Características  
- ✅ Registro e inicio de sesión de usuarios.  
- ✅ Creación de cuentas en distintas monedas.  
- ✅ Consulta de información personal y cuentas asociadas.  
- ✅ Realización de transferencias entre cuentas.  
- ✅ Búsqueda de cuentas por alias o número de cuenta.  
- ✅ Actualización de datos del usuario como alias, nombre de usuario y contraseña.  

## 📌 Rutas de la API  

### 🔐 Autenticación (`authRouter`)  
- **`POST /login`** → Inicia sesión con credenciales válidas.  
- **`POST /register`** → Registra un nuevo usuario.  

### 💳 Cuentas y Transferencias (`accountRouter`)  
- **`POST /transfers`** → Obtiene el historial de transferencias.  
- **`GET /lastTransfers`** → Obtiene las últimas transferencias realizadas.  
- **`PATCH /updateAlias`** → Actualiza el alias de una cuenta.  
- **`GET /`** → Obtiene información de la cuenta.  

### 👤 Usuarios (`userRouter`)  
- **`GET /info`** → Obtiene información personal del usuario.  
- **`GET /user`** → Obtiene información detallada del usuario.  
- **`GET /`** → Obtiene las cuentas personales del usuario.  
- **`GET /currencies`** → Obtiene las monedas disponibles.  
- **`POST /account`** → Crea una nueva cuenta en una moneda específica.  
- **`PATCH /updatePassword`** → Actualiza la contraseña del usuario.  
- **`PATCH /updateUsername`** → Actualiza el nombre de usuario.  

### 💸 Transferencias (`transferRouter`)  
- **`GET /agenda`** → Obtiene la agenda de contactos para transferencias.  
- **`POST /person`** → Obtiene las cuentas asociadas a una persona.  
- **`POST /`** → Busca una cuenta por alias o número de cuenta.  
- **`POST /create`** → Crea una nueva transferencia.  

## 🛠️ Tecnologías Utilizadas  
- **TypeScript**  
- **Node.js**  
- **PostgreSQL**  
- **JWT para autenticación**  

## 📌 Instalación  
1. Clonar el repositorio:  
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>


![diagrama fisico](https://github.com/user-attachments/assets/803c213c-2175-46a9-9b8e-de6e54eddbae)

