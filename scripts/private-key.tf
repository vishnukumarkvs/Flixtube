resource "tls_private_key" "key" {
    algorithm = "RSA"
}

resource "local_file" "key_file" {
 content = tls_private_key.key.private_key_pem
 filename = "${var.key_name}.pem"
 file_permission = 0400
}


output "cluster_private_key" {
  value = tls_private_key.key.private_key_pem
  sensitive = true
}

output "cluster_public_key" {
  value = tls_private_key.key.public_key_pem
}