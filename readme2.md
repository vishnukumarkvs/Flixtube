FROM jenkins/jenkins:lts

USER root

# Install dependencies
RUN apt-get update && \
    apt-get install -y unzip curl

# Download and install Terraform
RUN curl -LO https://releases.hashicorp.com/terraform/0.14.3/terraform_0.14.3_linux_amd64.zip && \
    unzip terraform_0.14.3_linux_amd64.zip -d /usr/local/bin && \
    rm terraform_0.14.3_linux_amd64.zip


---
azure cli

FROM jenkins/jenkins:lts

USER root

RUN apt-get update && \
    apt-get install -y apt-transport-https && \
    echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ stretch main" | tee /etc/apt/sources.list.d/azure-cli.list && \
    curl -L https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    apt-get update && \
    apt-get install -y azure-cli

---


version: '3'
services:
  jenkins:
    image: jenkins/jenkins:lts
    restart: always
    privileged: true
    user: root
    ports:
    - "8080:8080"
    - "50000:50000"
    container_name: jenkins-docker
    volumes:
    - jenkins_home:/var/jenkins_home
    - /var/run/docker.sock:/var/run/docker.sock

volumes:
  jenkins_home:

---

pipeline {
  agent any
  stages {
    stage('Checkout code from GitHub') {
      steps {
        git url: 'https://github.com/your-username/your-repository.git',
        branch: 'main'
      }
    }
    stage('Apply Terraform') {
      steps {
        withCredentials([azureServicePrincipal('my-azure-credentials')]) {
          sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID'
          sh 'terraform init'
          sh 'terraform apply -auto-approve'
        }
      }
    }
  }
}


          sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID'


pass var names
# Jenkinsfile
pipeline {
  environment {
    VAR_NAME = "value"
  }
  stages {
    stage('Terraform Apply') {
      steps {
        sh 'terraform apply -var "var_name=${env.VAR_NAME}"'
      }
    }
  }
}
