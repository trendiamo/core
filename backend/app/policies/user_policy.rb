class UserPolicy < ApplicationPolicy
  def permitted_attributes
    %i[customer_ref]
  end

  def update?
    user == record && record.customer_ref.present?
  end
end
