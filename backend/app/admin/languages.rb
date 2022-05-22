ActiveAdmin.register Language do
  permit_params :user_id, :name, :from, :remark
end
