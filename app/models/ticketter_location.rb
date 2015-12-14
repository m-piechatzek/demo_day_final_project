class TicketterLocation < ActiveRecord::Base
  belongs_to :user

  def self.search_time(duration)
    length = (((Time.now-duration.created_at)/3600)*60)

  end
end
