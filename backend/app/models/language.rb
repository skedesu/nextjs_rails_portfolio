class Language < ApplicationRecord
  belongs_to :user

  def experience
    from_arr = from.split('/')

    return '' if from_arr.length != 2

    year, month = from_arr.map(&:to_i)

    today = Date.today
    start_date = Date.new(year, month, 1)
    diff = (today - start_date).to_i

    experience_year = diff / 365
    experience_month = (diff % 365) / 30

    "#{experience_year} years, #{experience_month} months"
  end
end
