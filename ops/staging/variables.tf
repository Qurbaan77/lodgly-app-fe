variable "aws_region" {
  type    = string
  default = "eu-west-1"
}

variable "environment" {
  type    = string
  default = "staging"
}

variable "bucket" {
  type    = string
  default = "lodgly.dev-eu-west-1"
}

variable "description" {
  type    = string
  default = "Lodgly Main App"
}

variable "domain" {
  type    = string
  default = "*.lodgly.dev"
}

variable "domain_zone" {
  type    = string
  default = "lodgly.dev"
}

variable "tags" {
  type    = map(string)
  default = {
    Name        = "Main App Bucket"
    Project     = "Lodgly"
    Terraform   = true
    Environment = "staging"
  }
}