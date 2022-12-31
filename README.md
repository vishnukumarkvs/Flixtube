# Deploying Microservice in AKS using Terraform
- Here, we are going to deploy video-streaming microservice in Azure Kubernetes Service(AKS) using Terraform scripts
- Terraform is Infrastructure as Code (IaC) tool.
- We will build a container registry, kubernetes cluster(AKS) and deploy our service in it

## Explaining all terraform scripts
>### providers&#46;tf file
- This terraform file contains the cloud provider we are using. Terraform supports various cloud providers including AWS, Azure, GCP.
- Here we use Azure so the provider is azurerm
- We also use another provider **kubernetes** which i used for authentication. 
>### resource-group&#46;tf file
-  This is a basic terraform script to create a resource group in azure
- We use resource **azurerm_resource_group**
- It has two fields *name* and *location*
- We passed values to these two fields using variables
>### variables&#46;tf file and terraform.tfvars
- Simple Understanding
  - `variables.tf` --> To create variables  
  - `terraform.tfvars` --> To assign values to those variables

	 **variables&#46;tf**

	```bash
	variable "region" {
	   description = "Region of AWS"
	}
	```
	  **terraform.tfvars**

	```
	region="us-west-1"

	```

  - So, when you run terraform apply, it will load values from tfvars fie for the variables created. If there is no tfvars file, it will take the default value which you will assign at the time of declaring itself.

> ### container-registry&#46;tf file
- We create azure container registry resource in azure
- A container registry is a service for storing container images. It is similar to docker registry but here, its private

> ### kubernetes-cluster&#46;tf file
- This terraform script creates a kubernetes cluster i.e., AKS
- Now, this resource needs a service principal. The service principal for the AKS cluster **can be used to access other resources**
- We create a sp using azure cli
- **az ad sp create-for-rbac --skip-assignment**
- We get *appID* and *password* in output. Store it in tfvars file
- Now, we create kubernetes cluster using **azurerm_kubernetes_cluster** resource
- Here, we also create Linux profile. Using that, we can access nodes. For that we need a key-pair which wee create using **private-key&#46;tf** file
> ### video-streaming&#46;tf file
- In this script, we will build a docker image of the video-streaming service, publish it to azure container registry, then create a Kubernetes deployment with image which will be accessed from registry
- First, we use null resource with local-exec provisioner to run commands on local. We need to run 3 commands: docker_build, docker_login, docker_push
	```
	command  =  "docker build -t ${local.image_tag} --file ../${local.service_name}/Dockerfile ../${local.service_name}"
	command  =  "docker login ${local.login_server} --username ${local.username} --password ${local.password}"
	command  =  "docker push ${local.image_tag}"
	```
- Now, we have our docker image in ACR.
- Now, our kubernetes cluster needs to be able to access acr
- We will create a kubernetes_secret resource to store registry credentials
- Next, we create a kubernetes deployment,  pull image from registry using image_pull_secrets{} and start the container.
- We then also create a kubernetes service for the deployment
> ### database&#46;tf and rabbit&#46;tf
- We create kubernetes deployment and kubernetes service with mongodb and rabbitmq images

And tha's i

## Additional info
https://developer.hashicorp.com/terraform/tutorials/kubernetes/aks

Correct method: https://youtu.be/I-MbnfNcikk
github: https://github.com/piyushsachdeva/Terraform_AKS

version constraints inside provider configuration blocks are deprecated

az aks get-credentials --resource-group flixtube_rg  --name flixtube-aks

https://learn.microsoft.com/en-us/azure/container-registry/container-registry-auth-kubernetes



Delete all images
docker rmi $(docker images -q)

![stage10img](https://user-images.githubusercontent.com/116954249/205444935-5a3042fb-2cec-4c57-a86e-9822726f9c76.jpg)
