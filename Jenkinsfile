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
        dir('scripts'){
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
}