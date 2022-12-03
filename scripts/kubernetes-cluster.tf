resource "azurerm_kubernetes_cluster" "cluster" {
  name                = "${var.app_name}-aks"
  location            = var.location
  resource_group_name = azurerm_resource_group.r1.name
  dns_prefix          = "${var.app_name}-k8s"

  linux_profile {
        admin_username = var.admin_username

        ssh_key {
            key_data = "${trimspace(tls_private_key.key.public_key_openssh)} ${var.admin_username}@azure.com"
        }
    }

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

  provisioner "local-exec" {
    command = "az aks get-credentials --resource-group ${var.rg_name}  --name ${azurerm_kubernetes_cluster.cluster.name} --overwrite-existing"
  }
}

