class PingJob < ApplicationJob
  queue_as :default

  def perform
    puts '-- PingJob performed'
  end
end
