module Mutations
  class CreateTask < BaseMutation
    field :task, Types::TaskType, null: true
    field :result, Boolean, null: true

    argument :completed_at, String, required: false
    argument :detail, String, required: true
    argument :priority, Integer, required: true
    argument :expire_data, String, required: false
    argument :user_id, ID, required: true

    def resolve(**args)
      task = Task.new(args)
      messages = nil
      begin
        task.save
      rescue
        messages = task.errors.full_messages
        puts messages
      end
      {
        task: task,
        result: task.errors.blank?
      }
    end
  end
end
