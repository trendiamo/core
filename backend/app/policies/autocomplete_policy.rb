class AutocompletePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user&.editor? && !user&.admin
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
    !user&.editor? || user&.admin
  end

  def path_autocomplete?
    !user&.editor? || user&.admin
  end
end
