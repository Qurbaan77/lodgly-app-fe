data "aws_acm_certificate" "this" {
  domain   = var.domain_zone
  statuses = ["ISSUED"]

  provider = aws.global
}
