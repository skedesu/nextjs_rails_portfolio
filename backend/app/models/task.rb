class Task < ApplicationRecord
  belongs_to :user

  validates :detail,   presence: true
  validates :priority, presence: true

  enum priority: {
    high: 0,
    medium: 1,
    low: 2
  }
end
