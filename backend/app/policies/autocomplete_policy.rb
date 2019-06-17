class AutocompletePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.active_membership&.editor?
        scope.none
      else
        scope
      end
    end
  end

  def personas_autocomplete?
    user
  end

  def flows_autocomplete?
    user.active_membership&.owner? || user.admin
  end

  def path_autocomplete?
    user.active_membership&.owner? || user.admin
  end
end
