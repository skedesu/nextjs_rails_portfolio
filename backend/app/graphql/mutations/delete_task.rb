module Mutations
  class DeleteTask < BaseMutation
    field :task, Types::TaskType, null: true
    field :result, Boolean, null: true

    argument :id, ID, required: true
    argument :user_id, ID, required: true

    def resolve(**args)
      task = Task.find(args[:id])
      task.destroy
      {
        task: task,
        result: task.errors.blank?
      }
    end
  end
end
