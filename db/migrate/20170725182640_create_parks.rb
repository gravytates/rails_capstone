class CreateParks < ActiveRecord::Migration[5.1]
  def change
    create_table :parks do |t|
      t.string :NAME
      t.decimal :ACRES, precision: 14, scale: 12
    end
  end
end
