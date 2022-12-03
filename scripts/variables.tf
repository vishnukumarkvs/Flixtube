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

variable "key_name" {
  default = "key01"
}

variable "admin_username" {
  default = "vishnukvsvk"
}

variable "app_version" {
  default="1.0.0"
}