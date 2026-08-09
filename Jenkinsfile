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
                        if exist api-report rmdir /s /q api-report
                        if exist test-results rmdir /s /q test-results

                        mkdir api-report
                        mkdir test-results

                        docker run --rm ^
                            -e GOREST_TOKEN=%GOREST_TOKEN% ^
                            -v "%WORKSPACE%\\api-report:/app/playwright-report" ^
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
                    if exist ui-report rmdir /s /q ui-report

                    mkdir ui-report

                    docker run --rm ^
                        -v "%WORKSPACE%\\ui-report:/app/playwright-report" ^
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
            artifacts: 'api-report/**,ui-report/**,test-results/**',
            allowEmptyArchive: true
        )

        publishHTML([
            allowMissing: true,
            alwaysLinkToLastBuild: false,
            keepAll: true,
            reportDir: 'ui-report',
            reportFiles: 'index.html',
            reportName: 'UI Playwright Report'
        ])

        publishHTML([
            allowMissing: true,
            alwaysLinkToLastBuild: false,
            keepAll: true,
            reportDir: 'api-report',
            reportFiles: 'index.html',
            reportName: 'API Playwright Report'
        ])
    }
}
}
