data "aws_iam_policy_document" "s3_policy" {
  statement {
    sid       = "OnlyCloudfrontReadAccess"
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${local.bucket}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
    }
  }
}

resource "aws_s3_bucket" "this" {
  acl    = "private"
  bucket = local.bucket
  tags   = local.tags
}

resource "aws_s3_bucket_policy" "this" {
  bucket = aws_s3_bucket.this.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

resource "aws_s3_bucket_public_access_block" "private" {
  bucket = aws_s3_bucket.this.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
