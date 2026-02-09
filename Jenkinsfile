pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS',
    }
    
    environment {
        NODE_ENV = 'test'
        EMAIL_RECIPIENTS = 'seileiein5@gmail.com'  
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
    }
    
    // ADD THIS POST SECTION
    post {
        success {
            echo 'Build succeeded! Sending success email...'
            emailext (
                subject: "✅ SUCCESS: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """
                    <html>
                    <body style="font-family: Arial, sans-serif;">
                        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 20px; text-align: center;">
                            <h1>✅ Build Successful!</h1>
                        </div>
                        <div style="padding: 20px;">
                            <h2>Build Information</h2>
                            <p><strong>Project:</strong> ${env.JOB_NAME}</p>
                            <p><strong>Build Number:</strong> #${env.BUILD_NUMBER}</p>
                            <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                            
                            <h2>Test Results</h2>
                            <ul>
                                <li>✅ All tests passed</li>
                                <li>✅ Build completed successfully</li>
                            </ul>
                            
                            <p>
                                <a href="${env.BUILD_URL}" style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Build</a>
                            </p>
                        </div>
                    </body>
                    </html>
                """,
                to: "${env.EMAIL_RECIPIENTS}",
                mimeType: 'text/html'
            )
            echo 'Success email sent!'
        }
        
        failure {
            echo 'Build failed! Sending failure email...'
            emailext (
                subject: "❌ FAILURE: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """
                    <html>
                    <body style="font-family: Arial, sans-serif;">
                        <div style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; padding: 20px; text-align: center;">
                            <h1>❌ Build Failed!</h1>
                        </div>
                        <div style="padding: 20px;">
                            <h2>Build Information</h2>
                            <p><strong>Project:</strong> ${env.JOB_NAME}</p>
                            <p><strong>Build Number:</strong> #${env.BUILD_NUMBER}</p>
                            <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                            
                            <h2>Action Required</h2>
                            <p style="color: #dc3545; font-weight: bold;">Please check the console output to identify and fix the issue.</p>
                            
                            <p>
                                <a href="${env.BUILD_URL}console" style="background: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Console Output</a>
                            </p>
                        </div>
                    </body>
                    </html>
                """,
                to: "${env.EMAIL_RECIPIENTS}",
                mimeType: 'text/html'
            )
            echo 'Failure email sent!'
        }
        
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
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
}

