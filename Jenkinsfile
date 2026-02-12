pipeline {
    agent any
    tools { nodejs 'NodeJS' }
    environment {
        NODE_ENV = 'test'
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install & Test') {
            steps {
                bat 'npm install'
                bat 'npm test -- --passWithNoTests'
            }
        }
        stage('Docker Build') {
            steps {
                echo 'Building image inside Minikube...'
                /* We use 'minikube image build' because it doesn't 
                   require network certificates or open ports. */
                bat 'minikube image build -t blog-post-app:latest .'
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
        always { cleanWs() }
    }
}