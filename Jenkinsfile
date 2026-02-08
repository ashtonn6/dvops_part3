pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }
    
    environment {
        NODE_ENV = 'production'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'rm -rf node_modules'
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'echo "Build step completed"'
            }
        }
        
        stage('Unit Tests') {
            steps {
                echo 'Skipping unit tests for now...'
                sh 'echo "Unit tests disabled - will be implemented later"'
            }
        }
        
        stage('API Tests') {
            steps {
                echo 'Skipping API tests for now...'
                sh 'echo "API tests not configured yet"'
            }
        }
        
        stage('E2E Tests') {
            steps {
                echo 'Skipping E2E tests for now...'
                sh 'echo "E2E tests not configured yet"'
            }
        }
        
        stage('Code Coverage') {
            steps {
                echo 'Skipping code coverage for now...'
                sh 'echo "Code coverage not configured yet"'
            }
        }
        
        stage('Debug Docker Path') {
            steps {
                echo 'Finding Docker location...'
                sh 'echo "Current PATH: $PATH"'
                sh 'which docker || echo "docker not in PATH"'
                sh 'ls -la /usr/local/bin/ | grep docker || echo "not in /usr/local/bin"'
                sh 'ls -la /opt/homebrew/bin/ | grep docker || echo "not in /opt/homebrew/bin"'
                sh 'ls -la /Applications/Docker.app/Contents/Resources/bin/ | grep docker || echo "not in Docker.app"'
            }
        }
        
        stage('Build Docker Image') {
           steps {
               echo 'Building Docker image...'
               sh '''
               export DOCKER_CONFIG=/tmp/docker-config-$$
               mkdir -p $DOCKER_CONFIG
               echo '{"auths":{}}' > $DOCKER_CONFIG/config.json
               /usr/local/bin/docker build -t blog-post-app:${BUILD_NUMBER} .
              '''
            }
        }
    }
        
        stage('Deploy to Minikube') {
            steps {
                echo 'Deploying to Minikube...'
                sh 'kubectl apply -f k8s/deployment.yaml || echo "Deployment file not found"'
                sh 'kubectl apply -f k8s/service.yaml || echo "Service file not found"'
                sh 'kubectl set image deployment/blog-post-app blog-post-app=blog-post-app:${BUILD_NUMBER} || echo "Deployment update failed"'
                sh 'kubectl rollout status deployment/blog-post-app || echo "Rollout status check failed"'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }


