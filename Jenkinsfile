pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Descargando codigo del repositorio TaskManager'
                checkout scm
            }
        }

        stage('Validar estructura del proyecto') {
            steps {
                echo 'Validando archivos principales del proyecto'
                sh 'ls -la'
                sh 'test -f docker-compose.yml'
                sh 'test -f Dockerfile'
                sh 'test -d backend'
                sh 'test -f package.json'
            }
        }

        stage('Validar configuracion Docker Compose') {
            steps {
                echo 'Validando que docker-compose.yml tenga los servicios requeridos'
                sh 'grep -q "db:" docker-compose.yml'
                sh 'grep -q "backend:" docker-compose.yml'
                sh 'grep -q "frontend:" docker-compose.yml'
                sh 'grep -q "jenkins:" docker-compose.yml'
            }
        }

        stage('Resultado') {
            steps {
                echo 'Pipeline ejecutado correctamente: estructura, Docker Compose y Jenkins validados.'
            }
        }
    }
}