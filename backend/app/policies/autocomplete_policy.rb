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
    admin_or_account_member?
  end

  def flows_autocomplete?
    admin_or_owner?
  end

  def path_autocomplete?
    admin_or_owner?
  end

  def brands_autocomplete?
    seller?
  end
end
