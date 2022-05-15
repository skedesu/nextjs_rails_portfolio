# frozen_string_literal: true

module Types
  class TaskType < Types::BaseObject
    field :id, ID, null: false
    field :completed_at, GraphQL::Types::ISO8601DateTime
    field :detail, String, null: false
    field :priority, Integer, null: false
    field :expire_data, GraphQL::Types::ISO8601Date
    field :user_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
