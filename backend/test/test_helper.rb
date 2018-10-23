DatabaseCleaner.strategy = :transaction

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods # TODO: move this into the helper

  setup do
    DatabaseCleaner.start
    ActsAsTenant.default_tenant = Account.create!
  end

  teardown do
    DatabaseCleaner.clean
  end
end

# ActiveSupport::TestCase.add_setup_hook { DatabaseCleaner.start }
# ActiveSupport::TestCase.add_teardown_hook { DatabaseCleaner.clean }

# class Minitest::Spec
#   before :each do
#     DatabaseCleaner.start
#     ActsAsTenant.default_tenant = Account.create!
#   end
#
#   after :each do
#     DatabaseCleaner.clean
#   end
# end
