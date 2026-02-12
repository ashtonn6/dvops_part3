pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    environment {
        NODE_ENV = 'test'
        EMAIL_RECIPIENTS = 'ashtonn2@gmail.com'
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling latest code...'
                checkout scm
            }
        }
        stage('Install & Test') {
            steps {
                echo 'Installing and testing...'
                bat 'npm install'
                bat 'npm test -- --passWithNoTests'
            }
        }
        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                powershell '''
                    minikube docker-env --shell powershell | Invoke-Expression
                    docker build -t blog-post-app:latest .
                '''
            }
        }
        stage('Deploy') {
            steps {
                echo 'Applying Kubernetes manifests...'
                bat 'kubectl apply -f k8s/'
                bat 'kubectl rollout restart deployment/blog-post-app -n blog-app-prod'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
