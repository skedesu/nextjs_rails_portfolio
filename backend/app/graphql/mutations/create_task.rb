module Mutations
  class CreateTask < BaseMutation
    field :task, Types::TaskType, null: true
    field :result, Boolean, null: true

    argument :completed_at, String, required: false
    argument :detail, String, required: true
    argument :priority, String, required: true
    argument :expire_data, String, required: false
    argument :user_id, Int, required: true

    def resolve(**args)
      task = Task.create!(args)
      {
        task: task,
        result: task.errors.blank?
      }
    end
  end
end
