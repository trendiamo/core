class AutocompletePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if admin_or_owner?
        scope
      else
        scope.none
      end
    end
  end

  def sellers_autocomplete?
    user&.active_membership || user&.admin
  end

  def flows_autocomplete?
    admin_or_owner?
  end

  def path_autocomplete?
    admin_or_owner?
  end
end
