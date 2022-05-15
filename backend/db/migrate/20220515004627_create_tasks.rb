class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.datetime :completed_at
      t.string :detail, null: false
      t.integer :priority, null: false
      t.date :expire_data
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
