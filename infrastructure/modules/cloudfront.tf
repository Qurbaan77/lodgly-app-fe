data "aws_lambda_function" "cloudfront_headers" {
  function_name = "lambda-edge-${var.environment}-cloudfront-headers"
  qualifier     = var.lambda_versions.cloudfront_headers
  provider      = aws.global
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "access-identity-${local.bucket}.s3.amazonaws.com"
}

resource "aws_cloudfront_distribution" "this" {
  enabled             = true
  is_ipv6_enabled     = true
  wait_for_deployment = false
  default_root_object = "index.html"
  price_class         = "PriceClass_All"
  comment             = "[${var.environment}] ${var.name} ${var.description}"

  origin {
    domain_name = aws_s3_bucket.this.bucket_domain_name
    origin_id   = "S3-${local.bucket}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  aliases = [
    "*.${var.domain}"
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
    target_origin_id = "S3-${local.bucket}"

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
      lambda_arn   = data.aws_lambda_function.cloudfront_headers.qualified_arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.this.arn
    minimum_protocol_version = "TLSv1.2_2019"
    ssl_support_method       = "sni-only"
  }

  tags = local.tags
}
