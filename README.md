https://developer.hashicorp.com/terraform/tutorials/kubernetes/aks

Write method: https://youtu.be/I-MbnfNcikk
github: https://github.com/piyushsachdeva/Terraform_AKS

sevice principal
az ad sp create-for-rbac --skip-assignment

version constraints inside provider configuration blocks are deprecated

az aks get-credentials --resource-group flixtube_rg  --name flixtube-aks

https://learn.microsoft.com/en-us/azure/container-registry/container-registry-auth-kubernetes



Delete all images
docker rmi $(docker images -q)

