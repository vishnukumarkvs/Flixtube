variable "app_name" {     
    default = "flixtube"
}
variable location {       
  default = "West Us"
}
variable "rg_name" {
  default="flixtube_rg"
}

variable "appId" {
  description = "Azure Kubernetes Service Cluster service principal"
}

variable "password" {
  description = "Azure Kubernetes Service Cluster password"
}