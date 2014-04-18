class CreateUsers < ActiveRecord::Migration
  def change
  	create_table :users do |u|
      u.integer :user_id
      u.string :user_name
      u.timestamps
    end
  end
end

# class CreateEvents < ActiveRecord::Migration
#   def change
#   	create_table :events do |e|
#       e.integer :user_id
#       e.float :lat     # or belongs_to :teacher (name of class - singular)
#       e.float :long     # or belongs_to :student (name of class - singular)
#       e.string :comment
#       e.timestamps
#     end
#   end
# end