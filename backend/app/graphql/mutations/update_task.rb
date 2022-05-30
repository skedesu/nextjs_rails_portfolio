module Mutations
  class UpdateTask < BaseMutation
    field :task, Types::TaskType, null: true
    field :result, Boolean, null: true
    field :reason, String, null: true

    argument :id, ID, required: true
    argument :completed_at, String, required: false
    argument :detail, String, required: false
    argument :priority, Integer, required: false
    argument :expire_data, String, required: false
    argument :user_id, Int, required: true

    def resolve(**args)
      task_params = args.to_h
      task = Task.find(args[:id])

      task_params[:completed_at] = args[:completed_at].present? ? Time.current : nil
      task_params[:updated_at] = Time.current

      task.update(task_params)

      {
        task: task,
        result: task.errors.blank?,
        reason: task.errors.present? ? task.errors.full_messages.join(', ') : nil
      }
    end
  end
end
