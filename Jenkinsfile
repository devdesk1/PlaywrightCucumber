pipeline {
    agent any
    environment {
        GITHUB_REPO = 'https://github.com/devdesk1/PlaywrightCucumber.git'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git url: "${GITHUB_REPO}", branch: 'master'
            }
        }
        stage('Build') {
            steps {
                // Add build steps here
                sh 'echo "Building project..."'
            }
        }
        stage('Test') {
            steps {
                // Add test steps here
                sh 'echo "Running tests..."'
            }
        }
        stage('Deploy') {
            steps {
                // Add deployment steps here
                sh 'echo "Deploying application..."'
            }
        }
    }
    post {
        always {
            // Cleanup or notifications
            echo 'This will always run'
        }
        success {
            echo 'This will run only if the build succeeds'
        }
        failure {
            echo 'This will run only if the build fails'
        }
    }
}
