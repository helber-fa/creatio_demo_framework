pipeline {
agent any

environment {
    DOCKER_IMAGE = 'creatio-demo-framework'
}

stages {

    stage('Checkout') {
        steps {
            checkout scm
        }
    }

    stage('Build Docker Image') {
        steps {
            bat 'docker build -t %DOCKER_IMAGE% .'
        }
    }

    stage('API Tests') {
        steps {
            catchError(
                buildResult: 'FAILURE',
                stageResult: 'FAILURE'
            ) {
                withCredentials([
                    string(
                        credentialsId: 'gorest-token',
                        variable: 'GOREST_TOKEN'
                    )
                ]) {
                    bat '''
                        docker run --rm ^
                            -e GOREST_TOKEN=%GOREST_TOKEN% ^
                            -v "%WORKSPACE%\\playwright-report:/app/playwright-report" ^
                            -v "%WORKSPACE%\\test-results:/app/test-results" ^
                            %DOCKER_IMAGE% ^
                            npm run test:api
                    '''
                }
            }
        }
    }

    stage('UI Tests') {
        steps {
            catchError(
                buildResult: 'FAILURE',
                stageResult: 'FAILURE'
            ) {
                bat '''
                    docker run --rm ^
                        -v "%WORKSPACE%\\playwright-report:/app/playwright-report" ^
                        -v "%WORKSPACE%\\test-results:/app/test-results" ^
                        %DOCKER_IMAGE% ^
                        npm run test:chromium
                '''
            }
        }
    }
}

    post {
        always {
            archiveArtifacts(
            artifacts: 'playwright-report/,test-results/',
            allowEmptyArchive: true
            )

                publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
        }

    }

}
