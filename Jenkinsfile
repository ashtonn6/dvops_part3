pipeline {
    agent any
    tools { nodejs 'NodeJS' }
    environment {
        NODE_ENV = 'test'
        /* Use double backslashes for Windows paths in Groovy */
        MINIKUBE_HOME = 'C:\\Users\\agnes'
        KUBECONFIG = 'C:\\Users\\agnes\\.kube\\config'
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