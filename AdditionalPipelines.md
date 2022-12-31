terraform installation
command shell - freestyle
terraform --version

## listRgs
Add azure service principal and verify
az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/26c54b2f-dbef-4a0a-8ef7-ee63c958ca31"
pipeline {
    agent any

    stages {
        stage('Authenticate to Azure') {
            steps {
                withCredentials([azureServicePrincipal(credentialsId: '03fe43c7-5d68-42fd-b3c8-f1132abb692c')]) {
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

## Run terrafrom
pipeline {
  agent any
  parameters {
    booleanParam(name: 'APPLY', defaultValue: false, description: 'Check the box for terraform apply')
  }
  stages {
    stage('Checkout code from GitHub') {
      steps {
        git url: 'https://github.com/Vishnukvsvk/azure-terraform-example.git',
        branch: 'main'
      }
    }
    stage('Apply Terraform') {
      steps {
        script{
            withCredentials([azureServicePrincipal('03fe43c7-5d68-42fd-b3c8-f1132abb692c')]) {
              sh 'terraform init'
              if (params.APPLY.toBoolean()) {
                sh 'terraform apply -var "client_id=$AZURE_CLIENT_ID" -var "client_secret=$AZURE_CLIENT_SECRET" -var "tenant_id=$AZURE_TENANT_ID" -auto-approve'
              } else {
                sh 'terraform destroy -var "client_id=$AZURE_CLIENT_ID" -var "client_secret=$AZURE_CLIENT_SECRET" -var "tenant_id=$AZURE_TENANT_ID" -auto-approve'
              }
            }
          }
      }
    }
  }
}