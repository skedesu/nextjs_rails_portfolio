module Mutations
  class CreateUser < BaseMutation
    field :user, Types::UserType, null: true
    field :result, Boolean, null: true

    argument :email, String, required: true
    argument :password, String, required: true
    argument :password_confirmation, String, required: true

    def resolve(**args)
      user = User.create!(args)
      {
        user: user,
        result: user.errors.blank?
      }
    end
  end
end
