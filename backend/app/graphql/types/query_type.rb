module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :user, Types::UserType.connection_type, null: true do
      description "Find User by ID"
      argument :id, ID, required: true
    end
    def user(id:)
      User.find(id)
    end

    field :users, Types::UserType.connection_type, null: true do
      description 'select reviews'
    end
    def users
      User.all
    end

    field :task, Types::TaskType.connection_type, null: true do
      description "Find Task by ID"
      argument :id, ID, required: true
    end
    def task(id:)
      Task.find(id)
    end

    field :tasks, Types::TaskType.connection_type, null: true do
      description 'Select Tasks'
    end
    def tasks
      Task.all
    end
  end
end
