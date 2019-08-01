module Commands
  class Version < Commands::Base
    def perform
      git_version = ENV["GIT_REV"] || `git rev-parse -q --verify HEAD`.strip
      hostname = `hostname`.strip
      say_in_context("I'm running on `#{hostname}`, at rev: `#{git_version}`")
    end
  end
end
