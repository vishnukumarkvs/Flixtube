resource "kubernetes_deployment" "database" {
  metadata{
    name = "database"
    labels ={
        pod="database"
    }
  }
  spec{
    replicas = 1
    selector{
        match_labels={
            pod = "database"
        }
    }
    template{
        metadata{
            labels = {
                pod="database"
            }
        }
        spec{
            container{
                image="mongo:latest"
                name="database"
                port{
                    container_port = 27017
                }
            }
        }
    }
  }
}

//Declares a Kubernetes service that creates a DNS record so the database is accessible by other containers within the cluster
resource "kubernetes_service" "database" {
  metadata {
    name="database"
  }
  spec{
    selector = {
      pod = kubernetes_deployment.database.metadata[0].labels.pod
    }
    port{
        port = 27017
    }
    type="LoadBalancer"
  }
}