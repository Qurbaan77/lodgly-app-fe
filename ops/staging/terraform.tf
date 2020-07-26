terraform {
  required_version = "0.12.29"

  backend "s3" {
    bucket  = "terraform-infrastructure-state-eu-west-1"
    region  = "eu-west-1"
    key     = "lodgly/aws/frontend-app.tfstate"
    encrypt = true

    dynamodb_table = "terraform-lock-global"
  }
}
