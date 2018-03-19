class UserPolicy < ApplicationPolicy
  # class Scope < Scope
  #   def resolve
  #     scope.all
  #   end
  # end

  def update?
    user == record && record.customer_ref.present?
  end

  def permitted_attributes
    %i[customer_ref]
  end
end
