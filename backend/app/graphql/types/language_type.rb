# frozen_string_literal: true

module Types
  class LanguageType < Types::BaseObject
    field :id, ID, null: false
    field :user_id, String, null: false
    field :name, String, null: false
    field :from, String, null: false
    field :remark, String, null: false
    field :experience, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
