# Identity and Access Management (IAM) Integration Project

This project is a **Laboratory Work** focused on implementing a secure authentication and authorization system using an **IAM platform (Casdoor)** and a **custom web application**. The primary goal is to demonstrate secure communication between services using **Reverse Proxy (Nginx)**, **TLS termination**, and **subdomain-based service isolation**.

## Tech Stack
* **Monorepo Management:** Turborepo
* **IAM Platform:** Casdoor
* **Web Frontend:** React / Next.js (inside `web` package)
* **Backend API:** Node.js / Nest.js (inside `api` package)
* **Reverse Proxy:** Nginx
* **Containerization:** Docker & Docker Compose
* **Security:** TLS/SSL (HTTPS) via custom certificates

---

## Prerequisites
Before starting, ensure you have the following installed:
* Docker
* Node.js
* mkcert

---

## Setup & Installation

### Environment Variables
Copy the example environment file and fill in the necessary secrets and endpoints:
```bash
cp .env.example .env
```

### SSL Certificates
The project requires HTTPS for communication. Generate certificates for `localhost` and `casdoor.localhost`:

**Using mkcert:**
```bash
mkcert -key-file infrastructure/certs/localhost-key.pem -cert-file infrastructure/certs/localhost.pem localhost casdoor.localhost 127.0.0.1
```

### Prune Packages for Docker
Since this is a monorepo, you must prune the workspace dependencies before building the Docker images to keep the context small:

```bash
# Prune for the Web frontend
npx turbo prune web --docker --out-dir ./out/web

# Prune for the API backend
npx turbo prune api --docker --out-dir ./out/api
```

---

## Running the Project

### Build and Start Containers
Run the following command to build the images using the pruned output and start the services:
```bash
docker-compose up --build
```

Once the containers are healthy:
* **Main Web App:** [https://localhost](https://localhost)
* **IAM Platform (Casdoor):** [https://casdoor.localhost](https://casdoor.localhost)
* **API Endpoint:** [https://localhost/api](https://localhost/api)
