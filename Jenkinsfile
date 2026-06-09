pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        IMAGE_NAME = 'taskmanager-frontend'
        IMAGE_TAG  = "${env.BUILD_NUMBER}"
    }

    stages {

        stage('1. Checkout') {
            steps {
                checkout scm
            }
        }

        stage('2. Instalar dependencias') {
            steps {
                dir('task-manager') {
                    sh 'npm ci'
                }
            }
        }

        stage('3. Pruebas unitarias') {
            steps {
                dir('task-manager') {
                    sh 'npm test -- --watchAll=false --passWithNoTests'
                }
            }
        }

        stage('4. Build de la aplicacion') {
            steps {
                dir('task-manager') {
                    sh 'npm run build'
                }
            }
        }

        stage('5. Build imagen Docker') {
            steps {
                dir('task-manager') {
                    sh 'DOCKER_BUILDKIT=0 docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
                }
            }
        }

        stage('6. Despliegue (rama main)') {
            when { branch 'main' }
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        always  { cleanWs() }
        success { echo 'Pipeline completado exitosamente.' }
        failure { echo 'Pipeline fallido. Revisar los logs.' }
    }
}
