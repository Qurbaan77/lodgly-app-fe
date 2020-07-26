data "aws_route53_zone" "lodgly_dev" {
  name = var.domain_zone
}

resource "aws_route53_record" "wildcard_lodgly_dev" {
  zone_id = data.aws_route53_zone.lodgly_dev.zone_id
  name    = var.domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.lodgly_dev.domain_name
    zone_id                = aws_cloudfront_distribution.lodgly_dev.hosted_zone_id
    evaluate_target_health = false
  }
}
