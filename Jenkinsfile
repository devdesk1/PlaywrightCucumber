pipeline {
    agent any

    environment {
        NODE_VERSION = '16.x' // Specify the Node.js version you need
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                git url: 'https://github.com/devdesk1/PlaywrightCucumber.git', branch: 'master'
            }
        }
        
        stage('Setup Node.js') {
            steps {
                // Install Node.js
                script {
                    def nodeHome = tool name: "NodeJS ${env.NODE_VERSION}", type: 'NodeJS'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run Playwright tests
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Archive test results or perform other cleanup actions
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
        success {
            echo 'Playwright tests passed successfully!'
        }
        failure {
            echo 'Playwright tests failed. Please check the logs.'
        }
    }
}
