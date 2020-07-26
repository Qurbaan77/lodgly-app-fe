provider "aws" {
  version = "~> 2.70"
  region  = var.aws_region
}

provider "aws" {
  version = "~> 2.70"
  region  = "us-east-1"
  alias   = "us_east_1"
}
