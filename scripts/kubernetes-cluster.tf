resource "azurerm_kubernetes_cluster" "default" {
  name                = "${var.app_name}-aks"
  location            = var.location
  resource_group_name = azurerm_resource_group.r1.name
  dns_prefix          = "${var.app_name}-k8s"

  default_node_pool {
    name            = "default"
    node_count      = 1
    vm_size         = "Standard_B2ms"
    os_disk_size_gb = 30
  }

  service_principal {
    client_id     = var.appId
    client_secret = var.password
  }

  role_based_access_control_enabled = true

  tags = {
    environment = "Demo"
  }
}