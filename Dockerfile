FROM jenkins/jenkins:lts

USER root

# Install dependencies
RUN apt-get update && \
    apt-get install -y unzip curl

# Download and install Terraform
RUN curl -LO https://releases.hashicorp.com/terraform/1.3.3/terraform_1.3.3_linux_amd64.zip && \
    unzip terraform_1.3.3_linux_amd64.zip -d /usr/local/bin && \
    rm terraform_1.3.3_linux_amd64.zip

# Download and install azure cli
RUN apt-get update && \
    apt-get install -y apt-transport-https && \
    echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ stretch main" | tee /etc/apt/sources.list.d/azure-cli.list && \
    curl -L https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    apt-get update && \
    apt-get install -y azure-cli

