class CreateLanguages < ActiveRecord::Migration[6.0]
  def change
    create_table :languages do |t|
      t.string :user_id, null: false
      t.string :name, null: false
      t.string :from, null: false
      t.string :remark, null: false

      t.timestamps
    end
  end
end
