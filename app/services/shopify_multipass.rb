class ShopifyMultipass
  def initialize(multipass_secret)
    key_material = OpenSSL::Digest.new("sha256").digest(multipass_secret)
    @encryption_key = key_material[0, 16]
    @signature_key = key_material[16, 16]
  end

  def generate_token(customer_data_hash)
    customer_data_hash["created_at"] = Time.now.iso8601
    ciphertext = encrypt(customer_data_hash.to_json)
    Base64.urlsafe_encode64(ciphertext + sign(ciphertext))
  end

  private

  def encrypt(plaintext)
    cipher = OpenSSL::Cipher.new("aes-128-cbc")
    cipher.encrypt
    cipher.key = @encryption_key
    cipher.iv = iv = cipher.random_iv
    iv + cipher.update(plaintext) + cipher.final
  end

  def sign(data)
    OpenSSL::HMAC.digest("sha256", @signature_key, data)
  end
end
