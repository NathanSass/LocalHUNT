class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :content
      t.string :latitude
      t.string :longitude

      t.timestamp
    end
  end
end
