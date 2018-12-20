class AutocompletePolicy < ApplicationPolicy
  def personas_autocomplete?
    user
  end

  def flows_autocomplete?
    user
  end

  def chat_steps_autocomplete?
    user
  end
end
