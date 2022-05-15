ActiveAdmin.register Task do
  permit_params :completed_at, :detail, :priority, :expire_data, :user_id

  form do |f|
    f.inputs do
      f.input :completed_at, as: :datepicker
      f.input :detail
      f.input :priority
      f.input :expire_data, as: :datepicker
      f.input :user_id
    end
    f.actions
  end
end
