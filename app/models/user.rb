class User < ActiveRecord::Base
	has_many :events
  # Remember to create a migration!
end
