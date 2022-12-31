resource "azurerm_container_registry" "container_registry" {
  name                = "vishnukvsflixtube"
  resource_group_name = azurerm_resource_group.r1.name
  location            = var.location
  sku                 = "Basic"
  admin_enabled       = true
}

output "registry_hostname" {              
  value = azurerm_container_registry.container_registry.login_server      
}
output "registry_un" {                    
  value = azurerm_container_registry.container_registry.admin_username    
}
output "registry_pw" {                    
  value = azurerm_container_registry.container_registry.admin_password
  sensitive = true
}