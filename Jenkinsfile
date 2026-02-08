pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }
    
    environment {
        NODE_ENV = 'test'
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
                sh 'npm install'
                sh 'npx playwright install chromium'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'npm run build || echo "No build step configured"'
            }
        }
        
        stage('Unit Tests') {
            steps {
                echo 'Running backend unit tests...'
                sh 'npm run test:unit'
            }
        }
        
        stage('API Tests') {
            steps {
                echo 'Running API integration tests...'
                sh 'npm run test:api'
            }
        }
        
        stage('E2E Tests') {
            steps {
                echo 'Running Playwright E2E tests...'
                sh 'npm run test:e2e'
            }
        }
        
        stage('Code Coverage') {
            steps {
                echo 'Generating code coverage reports...'
                sh 'npm test -- --coverage'
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'coverage/lcov-report',
                    reportFiles: 'index.html',
                    reportName: 'Coverage Report'
                ])
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t blog-post-app:${BUILD_NUMBER} .'
                sh 'docker tag blog-post-app:${BUILD_NUMBER} blog-post-app:latest'
            }
        }
        
        stage('Deploy to Minikube') {
            steps {
                echo 'Deploying to Minikube...'
                sh 'kubectl apply -f k8s/deployment.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
                sh 'kubectl set image deployment/blog-post-app blog-post-app=blog-post-app:${BUILD_NUMBER}'
                sh 'kubectl rollout status deployment/blog-post-app'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            emailext (
                subject: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: "Good news! The pipeline completed successfully.",
                to: "dev-team@example.com"
            )
        }
        failure {
            echo 'Pipeline failed!'
            emailext (
                subject: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: "The pipeline has failed. Please check the logs.",
                to: "dev-team@example.com"
            )
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}
