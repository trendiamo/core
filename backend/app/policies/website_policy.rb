class WebsitePolicy < ApplicationPolicy
  def show?
    user && (user.account.website.id == record.id)
  end

  def update?
    user && (user.account.website.id == record.id)
  end

  def update_website?
    graphcms_side_domain = record.id
    backend_side_domain = user.website_ref
    user && (graphcms_side_domain == backend_side_domain)
  end
end
