class User < ApplicationRecord
  has_secure_password

  has_many :tasks
  has_many :languages

  validates :email,           presence: true
  validates :password_digest, presence: true
end
