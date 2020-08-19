variable "aws_region" {
  type    = string
  default = "eu-west-1"
}

variable "name" {
  type = string
}

variable "project" {
  type = string
}

variable "environment" {
  type = string
}

variable "description" {
  type = string
}

variable "domain" {
  type = string
}

variable "domain_zone" {
  type = string
}

variable "lambda_versions" {
  type = object({
    cloudfront_headers = number
  })
}
