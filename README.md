# 📌 API de Autenticación y Transferencias Bancarias  

## 📖 Descripción  
Esta API permite la autenticación de usuarios, la creación de cuentas en diferentes monedas extranjeras, la gestión de transferencias bancarias y la búsqueda de cuentas por alias o número de cuenta.  

## 🚀 Características  
- ✅ Registro e inicio de sesión de usuarios.  
- ✅ Creación de cuentas en distintas monedas.  
- ✅ Consulta de información personal y cuentas asociadas.  
- ✅ Realización de transferencias entre cuentas con conversión automática de divisas.  
- ✅ Búsqueda de cuentas por alias o número de cuenta.  
- ✅ Actualización de datos del usuario como alias, nombre de usuario y contraseña.  

## 📌 Rutas de la API  

### 🔐 Autenticación (`authRouter`)  
- **`POST /login`** → Inicia sesión con credenciales válidas.  
- **`POST /register`** → Registra un nuevo usuario.  

### 👤 Usuarios (`userRouter`)  
- **`GET /:UserToken/info`** → Obtiene información personal del usuario.  
- **`GET /:UserToken/user`** → Obtiene información detallada del usuario.  
- **`GET /:UserToken/`** → Obtiene las cuentas personales del usuario.  
- **`GET /:UserToken/currencies`** → Obtiene las monedas disponibles.  
- **`POST /:UserToken/account`** → Crea una nueva cuenta en una moneda específica.  
- **`PATCH /:UserToken/updatePassword`** → Actualiza la contraseña del usuario.  
- **`PATCH /:UserToken/updateUsername`** → Actualiza el nombre de usuario.  

### 💳 Cuentas y Transferencias (`accountRouter`)  
- **`POST /:UserToken/:accountToken/transfers`** → Obtiene el historial de transferencias.  
- **`GET /:UserToken/:accountToken/lastTransfers`** → Obtiene las últimas transferencias realizadas.  
- **`PATCH /:UserToken/:accountToken/updateAlias`** → Actualiza el alias de una cuenta.  
- **`GET /:UserToken/:accountToken/`** → Obtiene información de la cuenta.  

### 💸 Transferencias (`transferRouter`)  
- **`GET /:UserToken/:accountToken/transfer/agenda`** → Obtiene la agenda de contactos para transferencias.  
- **`POST /:UserToken/:accountToken/transfer/person`** → Obtiene las cuentas asociadas a una persona.  
- **`POST /:UserToken/:accountToken/transfer/`** → Busca una cuenta por alias o número de cuenta.  
- **`POST /:UserToken/:accountToken/transfer/create`** → Crea una nueva transferencia.  

## 🛠️ Tecnologías Utilizadas  
- **TypeScript**  
- **Node.js**  
- **PostgreSQL**  
- **JWT para autenticación**  


## Modelo fisico de la base de datos

**`Submodel PERSON`** 


![subModel_person](https://github.com/user-attachments/assets/02acda59-0543-4dc7-ab83-ffec40da84d9)


**`Submodel BANKING`** 


![subModel_banking](https://github.com/user-attachments/assets/d352b097-c1bd-4bc8-a91c-4ae4b4ab4e61)




