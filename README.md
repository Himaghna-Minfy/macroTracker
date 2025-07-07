# macroTracker

![image](https://github.com/user-attachments/assets/9c38996c-604a-4aee-94a6-a3414909b64a)

 User Registration
POST http://localhost:5000/api/auth/register

![image](https://github.com/user-attachments/assets/9d5d09d0-bcc1-496b-99f6-7614b406efae)

User Login
POST http://localhost:5000/api/auth/login

![image](https://github.com/user-attachments/assets/20e8a20e-3bee-44c5-8f3e-9eaa63ce142c)

Get User Profile
GET http://localhost:5000/api/users/profile

![image](https://github.com/user-attachments/assets/7d6ee1fd-f1be-40e2-91ce-e1b09c1dc084)

Update User Profile
PUT http://localhost:5000/api/users/profile

![image](https://github.com/user-attachments/assets/d47f6bee-1f30-4269-80a2-26124ed0123e)

Search Foods
GET http://localhost:5000/api/foods/search?q=chicken

![image](https://github.com/user-attachments/assets/a819861a-4728-425a-a800-2c8d495f9208)

Add Food to Diary
POST http://localhost:5000/api/foods/diary

![image](https://github.com/user-attachments/assets/f83657db-77d6-41e0-b73c-15d5e638e44e)

Log Water Intake
POST http://localhost:5000/api/foods/water

![image](https://github.com/user-attachments/assets/dd6b0c7c-8d1b-4576-8633-9f392d06d7ac)

Log Weight
POST http://localhost:5000/api/foods/weight

![image](https://github.com/user-attachments/assets/7bcb8777-6267-4e60-81d3-d041b026acf0)

Get Dashboard Data
GET http://localhost:5000/api/dashboard?date=2024-01-15

![image](https://github.com/user-attachments/assets/b3eb93bd-95b2-47fc-a11f-523002f172d9)

Error Handling - Invalid Token
GET http://localhost:5000/api/users/profile

![image](https://github.com/user-attachments/assets/9901ed0a-c4ed-4a5d-82c0-40269e512cc7)

# 🍎 Macro Tracker Backend API

A RESTful API for tracking food, water, weight, and macros using **Node.js**, **Express**, and **MongoDB**.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens)

---

## 🚀 Features

- JWT Auth (Register/Login)
- User Profile & Targets
- Food Search & Logging
- Water + Weight Tracking
- Dashboard Analytics
- Input Validation & Security

---

## ⚙️ Setup

```bash
git clone https://github.com/Himaghna-Minfy/macroTracker.git
cd macroTracker
npm install
```
Create .env:

env
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/macro-tracker
JWT_SECRET=your_super_secure_key_min_32_chars
JWT_EXPIRE=30d
```
Seed sample food data:

```bash
npm run seed
```
Start server:

```bash
npm run dev
```
📚 API Overview
Base URL: http://localhost:5000/api
Auth Header: Authorization: Bearer <token>

Method	Endpoint	Auth	Description
POST	/auth/register	❌	Create account
POST	/auth/login	❌	Login user
GET	/users/profile	✅	Get user info
PUT	/users/profile	✅	Update nutrition goals
GET	/foods/search	✅	Search foods
POST	/foods/diary	✅	Log food intake
POST	/foods/water	✅	Log water consumption
POST	/foods/weight	✅	Log weight
GET	/dashboard	✅	Daily summary

Folder Structure

![image](https://github.com/user-attachments/assets/deac8435-367b-4e36-a153-e637deb39251)
