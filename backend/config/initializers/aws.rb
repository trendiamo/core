aws_config = {
  region: "eu-central-1",
  endpoint: "https://#{ENV["DO_SPACE_ENDPOINT"]}",
  access_key_id: ENV["DO_SPACES_KEY_ID"],
  secret_access_key: ENV["DO_SECRET_ACCESS_KEY"],
}

Aws.config.update(aws_config)
