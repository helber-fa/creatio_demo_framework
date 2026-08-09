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
                        if exist api-results rmdir /s /q api-results

                        mkdir api-report
                        mkdir api-results

                        docker run --rm ^
                            -e GOREST_TOKEN=%GOREST_TOKEN% ^
                            -e PLAYWRIGHT_JUNIT_OUTPUT_FILE=/app/test-results/results.xml ^
                            -v "%WORKSPACE%\\api-report:/app/playwright-report" ^
                            -v "%WORKSPACE%\\api-results:/app/test-results" ^
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
                    if exist ui-results rmdir /s /q ui-results

                    mkdir ui-report
                    mkdir ui-results

                    docker run --rm ^
                        -e PLAYWRIGHT_JUNIT_OUTPUT_FILE=/app/test-results/results.xml ^
                        -v "%WORKSPACE%\\ui-report:/app/playwright-report" ^
                        -v "%WORKSPACE%\\ui-results:/app/test-results" ^
                        %DOCKER_IMAGE% ^
                        npm run test:chromium
                '''
            }
        }
    }
}

post {
    always {
        junit(
            testResults: 'api-results/results.xml,ui-results/results.xml',
            allowEmptyResults: true
        )

        archiveArtifacts(
            artifacts: 'api-report/**,api-results/**,ui-report/**,ui-results/**',
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
