class HostnamePolicy < ApplicationPolicy
  def update_hostname?
    graphcms_side_domain = record.website["id"]
    backend_side_domain = user.website_ref
    user && (graphcms_side_domain == backend_side_domain)
  end

  def delete_hostname?
    graphcms_side_domain = record.website["id"]
    backend_side_domain = user.website_ref
    user && (graphcms_side_domain == backend_side_domain)
  end
end
