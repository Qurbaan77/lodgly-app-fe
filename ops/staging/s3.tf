data "aws_iam_policy_document" "s3_policy" {
  statement {
    sid       = "OnlyCloudfrontReadAccess"
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.bucket}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
    }
  }
}

resource "aws_s3_bucket" "lodgly_dev" {
  bucket = var.bucket
  acl    = "private"

  tags = var.tags
}

resource "aws_s3_bucket_policy" "lodgly_dev" {
  bucket = aws_s3_bucket.lodgly_dev.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

resource "aws_s3_bucket_public_access_block" "private" {
  bucket = aws_s3_bucket.lodgly_dev.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}