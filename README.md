# Blog Post Management System

A full-stack blog post management application with automated CI/CD pipeline using Jenkins, Docker, and Minikube.

## 📋 Project Overview

This project implements a blog post deletion feature with:
- **Backend API**: RESTful endpoint for deleting blog posts
- **Frontend UI**: Interactive interface with delete functionality
- **Comprehensive Testing**: Unit tests, API tests, and E2E tests
- **CI/CD Pipeline**: Automated build, test, and deployment
- **Containerization**: Docker support for consistent environments
- **Orchestration**: Kubernetes deployment with Minikube

## ✨ Features

### Delete Blog Post Feature
- Delete blog posts by ID through API endpoint
- Interactive frontend with delete buttons
- Confirmation dialogs for delete operations
- Real-time UI updates after deletion
- Comprehensive error handling
- Data persistence to JSON file

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker (optional)
- Minikube (optional)
- Jenkins (for CI/CD)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Install Playwright browsers:**
```bash
npx playwright install chromium
```

### Running the Application

**Development server:**
```bash
npm start
```

Access the application at `http://localhost:3000`

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Specific Test Suites

**Backend Unit Tests:**
```bash
npm run test:unit
```

**API Integration Tests:**
```bash
npm run test:api
```

**E2E Tests (Playwright):**
```bash
npm run test:e2e
```

**All Tests with Coverage:**
```bash
npm run test:all
```

## 📊 Test Coverage

The project achieves **100% code coverage** for the ashtonUtil.js module:

- ✅ Statements: 100%
- ✅ Branches: 100%
- ✅ Functions: 100%
- ✅ Lines: 100%

### Test Suites

1. **Backend Unit Tests** (5 tests)
   - Successful deletion
   - 404 for non-existent posts
   - Template file fallback
   - String/numeric ID handling
   - 500 error handling

2. **API Tests** (4 tests)
   - HTTP 200 success response
   - HTTP 404 not found
   - HTTP 500 server error
   - Mixed ID type handling

3. **E2E Tests** (9 tests)
   - Page load verification
   - Post display
   - Delete button functionality
   - Confirmation dialogs
   - Empty state display
   - Multiple deletions
   - Post count updates

## 🏗️ Project Structure

```
.
├── __tests__/                 # Test files
│   ├── ashtonUtil.test.js            # Unit tests
│   ├── ashtonUtil.api.test.js        # API tests
│   └── ashtonUtil.playwright.test.js # E2E tests
├── k8s/                       # Kubernetes manifests
│   ├── deployment.yaml
│   └── service.yaml
├── utils/                     # Application code
│   ├── ashtonUtil.js                 # Backend logic
│   ├── ashtonUtil.html               # Frontend UI
│   ├── resources.json                # Data file
│   └── resources.template.json       # Template data
├── Dockerfile                 # Docker configuration
├── Jenkinsfile               # CI/CD pipeline
├── package.json              # Dependencies
├── playwright.config.js      # Playwright configuration
└── server.js                 # Express server
```

## 🐳 Docker

### Build Image
```bash
docker build -t blog-post-app:latest .
```

### Run Container
```bash
docker run -p 3000:3000 blog-post-app:latest
```

## ☸️ Kubernetes Deployment

### Deploy to Minikube

1. **Start Minikube:**
```bash
minikube start
```

2. **Build image in Minikube:**
```bash
eval $(minikube docker-env)
docker build -t blog-post-app:latest .
```

3. **Deploy application:**
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

4. **Access the application:**
```bash
minikube service blog-post-app-service
```

### Check Deployment Status
```bash
kubectl get pods
kubectl get services
kubectl logs <pod-name>
```

## 🔄 CI/CD Pipeline

The Jenkins pipeline includes the following stages:

1. **Checkout** - Pull code from repository
2. **Install Dependencies** - Install npm packages and Playwright
3. **Build** - Build application (if needed)
4. **Unit Tests** - Run backend unit tests
5. **API Tests** - Run API integration tests
6. **E2E Tests** - Run Playwright tests
7. **Code Coverage** - Generate coverage reports
8. **Build Docker Image** - Create Docker image
9. **Deploy to Minikube** - Deploy to Kubernetes

### Email Notifications
- Success: Notification sent on successful pipeline completion
- Failure: Alert sent on pipeline failure

## 📝 API Documentation

### Delete Blog Post

**Endpoint:** `DELETE /api/posts/:id`

**Parameters:**
- `id` (path parameter) - Blog post ID to delete

**Success Response (200):**
```json
{
  "success": true,
  "message": "Blog post with ID 2 deleted successfully",
  "resources": [...]
}
```

**Not Found Response (404):**
```json
{
  "success": false,
  "message": "Blog post with ID 999 not found"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Internal server error while deleting blog post",
  "error": "Error details"
}
```

## 🎯 Additional Features Implemented

As part of the SDL (Self-Directed Learning) requirement, the following testing enhancements were proposed:

1. **Integration Testing** - Full workflow testing with real data
2. **Performance Testing** - Load testing for scalability
3. **Accessibility Testing** - WCAG 2.1 compliance verification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License

## 👤 Author

**Ong Pei Hao Ashton** (2400769B)
- Tutorial Group: P03
- Course: Diploma in Information Technology

## 🙏 Acknowledgments

- Jest documentation
- Playwright testing framework
- Express.js
- Node.js community

## 📞 Support

For questions or issues, please contact the development team or create an issue in the repository.
