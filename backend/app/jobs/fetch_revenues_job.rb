class FetchRevenuesJob
  def self.perform
    Mixpanel::FetchRevenues.perform
  end
end
