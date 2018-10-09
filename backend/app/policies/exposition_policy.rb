class ExpositionPolicy < ApplicationPolicy
  def update_exposition?
    graphcms_side_domain = record.domain
    backend_side_domain = user.exposition_hostname
    user && (graphcms_side_domain == backend_side_domain)
  end
end
