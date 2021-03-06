class User < ActiveRecord::Base
    # validates :email, presence: true, uniqueness: true,
    # format:  /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

    has_secure_password

    has_many :ticketter_locations, dependent: :destroy
    has_one :checkin_location
end
