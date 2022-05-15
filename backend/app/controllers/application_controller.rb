class ApplicationController < ActionController::Base
  include Knock::Authenticable

  def not_development?
    !Rails.env.development?
  end
end
