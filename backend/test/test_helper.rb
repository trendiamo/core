DatabaseCleaner.strategy = :transaction

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods

  setup do
    DatabaseCleaner.start
  end

  teardown do
    ActsAsTenant.default_tenant = nil
    DatabaseCleaner.clean
  end
end
