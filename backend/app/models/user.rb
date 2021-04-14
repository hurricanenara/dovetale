class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true

  has_many :saved_lists

  has_many :gifs,
  through: :saved_lists

end
