# 🎬 Netflix Clone

[![Last Commit](https://img.shields.io/github/last-commit/nitaidaud/Netflix-Clone)](https://github.com/nitaidaud/Netflix-Clone/commits/main)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-Full%20Stack-red)](#-technologies-used)
[![Issues](https://img.shields.io/github/issues/nitaidaud/Netflix-Clone)](https://github.com/nitaidaud/Netflix-Clone/issues)
[![Stars](https://img.shields.io/github/stars/nitaidaud/Netflix-Clone)](https://github.com/nitaidaud/Netflix-Clone/stargazers)
[![Forks](https://img.shields.io/github/forks/nitaidaud/Netflix-Clone)](https://github.com/nitaidaud/Netflix-Clone/network/members)

Welcome to the **Netflix Clone** – a full-stack streaming platform that features secure authentication, profile management, integrated payment processing, and adaptive video streaming. Built with **microservices architecture** to ensure maximum scalability, maintainability, and performance.  

🔥 Stream your favorite shows, manage personalized profiles, and enjoy a premium user experience – just like the real thing!

---

## 🌐 Overview

### ✨ Core Features

- 🔐 **User Authentication**: Register, login, logout, verify email, and reset passwords securely.
- 👥 **Multiple Profiles**: Create up to **4 personalized profiles** under a single account.
- 💳 **Payment Processing**: PayPal integration with multiple payment methods supported.
- 🎥 **Video Streaming**: Custom video player with support for quality selection and adaptive streaming.

---

## 🛠️ Technologies Used

| Category              | Stack/Tools                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| **Frontend**           | React ⚛️, TypeScript, Tailwind CSS 🎨, Shadcn UI, Redux                    |
| **Backend**            | Node.js 🚀, Express, TypeScript                                             |
| **Database**           | PostgreSQL 🐘 with Prisma ORM                                               |
| **Authentication**     | JWT 🔐, bcrypt 🔒, crypto                                                    |
| **Payment Gateway**    | PayPal 💰                                                                  |
| **Streaming**          | HLS 📺, AWS S3 ☁️                                                           |
| **Caching**            | Redis 🧠                                                                   |
| **Containerization**   | Docker 🐳                                                                  |
| **Testing**            | Jest 🧪, SuperTest ✅                                                       |

---

## 🧱 Microservices Architecture

This project uses a **microservices-based architecture**, where each domain (auth, streaming, payment, etc.) is isolated in its own service. These services communicate via APIs, ensuring flexibility and scalability.

📦 Services include:
- `Auth-service`
- `Profile-service`
- `Streaming-service`
- `Payment-service`
- `Gateway-service`
- `Movies-service`

Each service is containerized using Docker and orchestrated via `docker-compose`.

---

## 📺 Streaming Functionality

The streaming service uses **HLS (HTTP Live Streaming)** to segment videos, which are stored on **AWS S3**.  
This enables **adaptive bitrate streaming**, providing smooth playback across all devices and network conditions.

Features:
- Quality selection
- Segment-based streaming
- AWS-hosted media for scalability

---

## 🖼️ Media Gallery

#### 🏠 Home Page  
![Home Page](https://github.com/user-attachments/assets/d8f023aa-3c97-4d2e-bafb-652e34e4c2bb)

---

#### 💳 Payment Page  
![Payment Page](https://github.com/user-attachments/assets/e2afef4a-e202-4df1-a3b8-ecdb3c8e7b42)

---

#### 👤 Profile Selection  
![Profile Page](https://github.com/user-attachments/assets/647e7dac-8806-4f65-8d55-77f5fdbec6d1)

---

#### 📺 TV Show  
![TV Show Page](https://github.com/user-attachments/assets/bb40a144-2f56-43ad-aab7-e1962bfdfdcf)

---

## 🧪 Testing

The codebase is tested using:
- **Jest** for unit tests
- **SuperTest** for API and integration tests

This ensures a stable and reliable system across all services.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo, suggest features, or submit pull requests.  
Together, let’s build the ultimate Netflix experience! 🙌
