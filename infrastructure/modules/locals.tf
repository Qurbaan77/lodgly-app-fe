locals {
  bucket = join("-", [var.domain, var.aws_region])
  tags   = {
    Terraform   = true
    Name        = "${var.name} ${var.description}"
    Project     = var.project
    Environment = var.environment
  }
}
