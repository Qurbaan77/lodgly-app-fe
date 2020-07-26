data "aws_lambda_function" "headers" {
  function_name = "cloudfront-headers-${var.environment}"
  qualifier     = "5"
  provider      = aws.us_east_1
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "access-identity-${var.bucket}.s3.amazonaws.com"
}

resource "aws_cloudfront_distribution" "lodgly_dev" {
  enabled             = true
  is_ipv6_enabled     = true
  wait_for_deployment = false
  default_root_object = "index.html"
  price_class         = "PriceClass_All"
  comment             = "[staging] Lodgly Main App"

  origin {
    domain_name = aws_s3_bucket.lodgly_dev.bucket_domain_name
    origin_id   = "S3-${var.bucket}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  aliases = [
    replace(var.domain, "*.", ""),
    var.domain,
  ]

  custom_error_response {
    error_caching_min_ttl = 60
    error_code            = 400
    response_code         = 200
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_caching_min_ttl = 60
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    compress         = true
    target_origin_id = "S3-${var.bucket}"

    forwarded_values {
      query_string = true

      headers = ["Origin"]
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000

    lambda_function_association {
      event_type   = "origin-response"
      include_body = false
      lambda_arn   = data.aws_lambda_function.headers.qualified_arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.lodgly_dev.arn
    minimum_protocol_version = "TLSv1.2_2019"
    ssl_support_method       = "sni-only"
  }

  tags = var.tags
}
