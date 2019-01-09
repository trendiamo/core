class AutocompletePolicy < ApplicationPolicy
  def personas_autocomplete?
    user
  end

  def flows_autocomplete?
    user
  end

  def path_autocomplete?
    user
  end
end
