data "aws_acm_certificate" "lodgly_dev" {
  domain   = "lodgly.dev"
  statuses = ["ISSUED"]

  provider = aws.us_east_1
}

