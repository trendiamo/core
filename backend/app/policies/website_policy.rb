class WebsitePolicy < ApplicationPolicy
  def update_website?
    graphcms_side_domain = record.id
    backend_side_domain = user.website_ref
    user && (graphcms_side_domain == backend_side_domain)
  end
end
