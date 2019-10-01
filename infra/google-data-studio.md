# Google Data Studio

```sh
# Connect to droplet and db
dokku postgres:connect console-backend-pg
```

## Commands to setup "readonly" role and "report" user

```sql
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON DATABASE "console_backend_pg" FROM PUBLIC;
CREATE ROLE readonly;
GRANT CONNECT ON DATABASE "console_backend_pg" TO readonly;
GRANT USAGE ON SCHEMA public TO readonly;
GRANT SELECT ON TABLE "affiliate_links", "affiliations", "brands", "generated_urls", "images", "memberships",
                      "orders", "outros", "product_picks", "products", "sellers", "showcases", "simple_chat_messages",
                      "simple_chat_sections", "simple_chats", "spotlights",
                      "tagged_products_clients", "triggers", "website_settings", "websites" TO readonly;
GRANT SELECT ("id", "username", "email", "first_name", "last_name", "customer_ref", "reset_password_sent_at",
              "remember_created_at", "sign_in_count", "current_sign_in_at", "last_sign_in_at", "current_sign_in_ip",
              "last_sign_in_ip", "created_at", "updated_at", "img_url", "confirmed_at", "confirmation_sent_at",
              "unconfirmed_email", "subscribed_to_newsletter", "onboarding_stage", "admin", "img_rect",
              "affiliate_role", "social_media_url", "referral_code", "referred_by_code",
              "requested_upgrade_to_seller_at", "currency", "bio", "date_of_birth", "shipping_first_name",
              "shipping_last_name", "address_line1", "address_line2", "zip_code", "city", "country",
              "payment_first_name", "payment_last_name", "payment_address", "phone_number", "iban",
              "photo_id_front_url", "photo_id_back_url") ON TABLE "users" TO readonly;
GRANT SELECT ("id", "created_at", "updated_at", "name", "slug", "is_affiliate") ON TABLE "accounts" TO readonly;
GRANT SELECT ("id", "email", "role", "sender_id", "recipient_id", "account_id", "accepted_at",
              "created_at", "updated_at") ON TABLE "invites" TO readonly;

CREATE USER report WITH PASSWORD 'xxx';
GRANT readonly TO report;

CREATE VIEW users_view AS SELECT "id", "username", "email", "first_name", "last_name", "customer_ref",  
              "reset_password_sent_at", "remember_created_at", "sign_in_count", "current_sign_in_at", "last_sign_in_at",
              "current_sign_in_ip", "last_sign_in_ip", "created_at", "updated_at", "img_url", "confirmed_at",
              "confirmation_sent_at", "unconfirmed_email", "subscribed_to_newsletter", "onboarding_stage", "admin",
              "img_rect", "affiliate_role", "social_media_url", "referral_code", "referred_by_code",
              "requested_upgrade_to_seller_at", "currency", "bio", "date_of_birth", "shipping_first_name",
              "shipping_last_name", "address_line1", "address_line2", "zip_code", "city", "country",
              "payment_first_name", "payment_last_name", "payment_address", "phone_number", "iban",
              "photo_id_front_url", "photo_id_back_url" from users;

CREATE VIEW accounts_view AS SELECT "id", "created_at", "updated_at", "name", "slug", "is_affiliate" from accounts;
CREATE VIEW invites_view AS SELECT "id", "email", "role", "sender_id", "recipient_id", "account_id", "accepted_at",
                                   "created_at", "updated_at" FROM invites;

GRANT SELECT ON users_view TO readonly;
GRANT SELECT ON accounts_view TO readonly;
GRANT SELECT ON invites_view TO readonly;
```

```sh
# Expose the postgres service
dokku postgres:expose console-backend-pg
# Print the connection information
dokku postgres:info console-backend-pg
```
