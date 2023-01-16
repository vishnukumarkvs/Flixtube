# Creating Jenkins pipeline to run Terraform scripts
- _Jenkins_ is an open source automation server which enables developers around the world to reliably build, test, and deploy their software.
- In this stage, we are going to write a jenkins pipeline script to run our azure terraform scripts in jenkins

---
- First, we need to setup Jenkins. Normal way to setup Jenkins is to use a Virtual Machine in cloud. There are various steps to configure Jenkins in a VM and if you are a beginner, you might face issues.
- So for simplicity, I used docker for jenkins setup. I used ```jenkins/jenkins:lts``` docker image and created Dockerfile to download additional software packages such as **Terraform** and **Azure CLI**.
- To run jenkins, I used docker-compose file
---
- To run terraform scripts for azure cloud, we need to authenticate to azure.
- For that, we need to create a **Service principal**. To create a sp, run the command in azure cli - ```az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/<subscription-id>"```. For now, store it in some place.
- As said earlier, to starts jenkins, run `docker-compose up --build -d` 
- I have given the port 8080 so you can find jenkins in `localhost:8080`
- You need initial password which you can get from running `docker-compose logs --follow`
- Then, you can install preferred plugins and move forward
- Now, in Jenkins you need to authenticate to Azure. For that we install Azure Credentials Plugin in Manage Jenkins > Manage Plugins > Available Plugins
- After installation, Go to Manage Jenkins > Manage Credentials > global > Add Credentials
- Select Type as Service Principal and update all the details from the service principal we created from azure cli. You can also verify its connection.
---
- We provide azure authentication to terraform using *providers&#183;tf* file
- There we pass service principal using variables which we get from Jenkins
- Now we create a **Jenkinsfile** where we write a pipeline script to run terraform scripts
- In jenkins, we create a pipeline job and use option pipeline from scm and give github repo details.
- Atlast, we build the pipeline which runs the terraform script.

## Bug - password not working in kubernetes deployment
