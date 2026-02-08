# DEPLOYMENT GUIDE

## Complete Setup Instructions for Blog Post Management System

### Prerequisites Installation

#### 1. Install Node.js
```bash
# Download and install Node.js 18+ from nodejs.org
# Verify installation
node --version
npm --version
```

#### 2. Install Docker
```bash
# For Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io

# For macOS
brew install docker

# Verify
docker --version
```

#### 3. Install Minikube
```bash
# For Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# For macOS
brew install minikube

# Verify
minikube version
```

#### 4. Install kubectl
```bash
# For Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# For macOS
brew install kubectl

# Verify
kubectl version --client
```

### Project Setup

#### Step 1: Clone/Setup Project
```bash
# Navigate to project directory
cd /path/to/project

# Verify all files are present
ls -la
```

#### Step 2: Install Dependencies
```bash
# Install npm packages
npm install

# Install Playwright browsers
npx playwright install chromium
```

#### Step 3: Run Tests Locally
```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit    # Backend unit tests
npm run test:api     # API integration tests
npm run test:e2e     # Playwright E2E tests

# Check coverage
npm test -- --coverage
```

### Local Development

#### Start Development Server
```bash
npm start
```

Access application at: `http://localhost:3000`

### Docker Deployment

#### Build Docker Image
```bash
docker build -t blog-post-app:latest .
```

#### Run Docker Container
```bash
docker run -d -p 3000:3000 --name blog-app blog-post-app:latest
```

#### Verify Container
```bash
docker ps
docker logs blog-app
```

#### Access Application
Open browser: `http://localhost:3000`

#### Stop Container
```bash
docker stop blog-app
docker rm blog-app
```

### Minikube Deployment

#### Step 1: Start Minikube
```bash
minikube start
```

#### Step 2: Build Image in Minikube
```bash
# Point Docker to Minikube's Docker daemon
eval $(minikube docker-env)

# Build image
docker build -t blog-post-app:latest .
```

#### Step 3: Deploy to Kubernetes
```bash
# Apply deployment
kubectl apply -f k8s/deployment.yaml

# Apply service
kubectl apply -f k8s/service.yaml
```

#### Step 4: Verify Deployment
```bash
# Check pods
kubectl get pods

# Check services
kubectl get services

# Check deployment
kubectl get deployments
```

#### Step 5: Access Application
```bash
# Get URL
minikube service blog-post-app-service --url

# Or open in browser automatically
minikube service blog-post-app-service
```

#### Step 6: Monitor Application
```bash
# Watch pods
kubectl get pods -w

# View logs
kubectl logs -f <pod-name>

# Describe pod
kubectl describe pod <pod-name>
```

### Jenkins CI/CD Setup

#### Install Jenkins
```bash
# For Ubuntu
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

#### Access Jenkins
```bash
# Get initial password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Open: `http://localhost:8080`

#### Configure Jenkins

1. **Install Required Plugins:**
   - NodeJS Plugin
   - Docker Pipeline Plugin
   - Kubernetes Plugin
   - Email Extension Plugin

2. **Configure NodeJS:**
   - Manage Jenkins → Global Tool Configuration
   - Add NodeJS installation (name: "NodeJS")

3. **Create Pipeline:**
   - New Item → Pipeline
   - Name: "Blog-Post-CI-CD"
   - Pipeline Definition: Pipeline script from SCM
   - SCM: Git
   - Repository URL: <your-repo-url>
   - Script Path: Jenkinsfile

4. **Configure Credentials:**
   - Docker Hub credentials
   - Git credentials (if private repo)

5. **Build Pipeline:**
   - Click "Build Now"
   - Monitor console output

### Troubleshooting

#### Tests Failing
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Run tests with verbose
npm test -- --verbose
```

#### Docker Build Issues
```bash
# Check Docker is running
docker ps

# Clear Docker cache
docker system prune -a
```

#### Minikube Issues
```bash
# Reset Minikube
minikube delete
minikube start

# Check status
minikube status
```

#### Pod Not Starting
```bash
# Check events
kubectl get events --sort-by=.metadata.creationTimestamp

# Describe pod
kubectl describe pod <pod-name>

# Check logs
kubectl logs <pod-name>
```

### Cleanup

#### Stop Everything
```bash
# Stop Minikube
minikube stop

# Delete deployment
kubectl delete -f k8s/deployment.yaml
kubectl delete -f k8s/service.yaml

# Remove Docker containers
docker stop blog-app
docker rm blog-app

# Remove Docker images
docker rmi blog-post-app:latest
```

### Commands Reference

#### NPM Scripts
```bash
npm start          # Start server
npm test           # Run all tests
npm run test:unit  # Unit tests only
npm run test:api   # API tests only
npm run test:e2e   # E2E tests only
```

#### Docker Commands
```bash
docker build -t blog-post-app .
docker run -p 3000:3000 blog-post-app
docker ps
docker logs <container-id>
docker exec -it <container-id> sh
```

#### Kubernetes Commands
```bash
kubectl apply -f <file>
kubectl get pods
kubectl get services
kubectl get deployments
kubectl logs <pod-name>
kubectl describe pod <pod-name>
kubectl delete pod <pod-name>
```

#### Minikube Commands
```bash
minikube start
minikube stop
minikube delete
minikube status
minikube dashboard
minikube service <service-name>
```

### Support

For issues or questions:
- Check README.md
- Review test output
- Check logs (application, Docker, Kubernetes)
- Contact: Ashton Ong (2400769B)
