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

provider "aws" {
  version = "~> 2.70"
  region  = "eu-west-1"
}

provider "aws" {
  version = "~> 2.70"
  region  = "us-east-1"
  alias   = "global"
}

module "lodgly_dev" {
  source = "./modules"

  environment = "staging"
  domain      = "lodgly.dev"
  domain_zone = "lodgly.dev"

  name        = "Lodgly"
  project     = "lodgly-app-web"
  description = "Lodgly Main App"

  lambda_versions = {
    cloudfront_headers = 12
  }

  providers = {
    aws        = aws
    aws.global = aws.global
  }
}

module "lodgly_com" {
  source = "./modules"

  environment = "production"
  domain      = "lodgly.com"
  domain_zone = "lodgly.com"

  name        = "Lodgly"
  project     = "lodgly-app-web"
  description = "Lodgly Main App"

  lambda_versions = {
    cloudfront_headers = 1
  }

  providers = {
    aws        = aws
    aws.global = aws.global
  }
}
