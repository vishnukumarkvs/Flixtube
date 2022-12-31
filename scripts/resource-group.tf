resource "azurerm_resource_group" "r1" {
  name     = var.rg_name
  location = var.location
}