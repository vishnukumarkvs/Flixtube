docker-compose up -d 

docker-compose logs --follow

https://stackoverflow.com/questions/36765138/bind-to-docker-socket-on-windows

check cpu and mem of container 
docker stats [OPTIONS] [CONTAINER...]

integrate aws and jenkins
https://www.youtube.com/watch?v=99mpfcLvQNc 


pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/<user>/<repository>.git'
            }
        }
        stage('Install Terraform') {
            steps {
                sh 'curl -O https://releases.hashicorp.com/terraform/0.12.24/terraform_0.12.24_linux_amd64.zip'
                sh 'unzip terraform_0.12.24_linux_amd64.zip'
                sh 'mv terraform /usr/local/bin/'
            }
        }
        stage('Run Terraform') {
            steps {
                sh 'terraform init'
                sh 'terraform apply -auto-approve'
            }
        }
    }
}


pipeline {
    agent any

    stages {
        stage('Authenticate to Azure') {
            steps {
                withCredentials([azureCredentials(credentialsId: '<credentials_id>')]) {
                    sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID'
                }
            }
        }
        stage('List resource groups') {
            steps {
                sh 'az group list --output table'
            }
        }
    }
}

https://medium.com/@seifeddinemouelhi/configure-azure-active-directory-with-jenkins-e6ea31fb833e


***
az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/26c54b2f-dbef-4a0a-8ef7-ee63c958ca31"