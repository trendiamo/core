class AutocompletePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user&.admin || user&.active_membership&.owner?
        scope
      else
        scope.none
      end
    end
  end

  def personas_autocomplete?
    user&.active_membership || user&.admin
  end

  def flows_autocomplete?
    user&.admin || user&.active_membership&.owner?
  end

  def path_autocomplete?
    user&.admin || user&.active_membership&.owner?
  end
end
