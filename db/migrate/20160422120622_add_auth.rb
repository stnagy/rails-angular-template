class AddAuth < ActiveRecord::Migration
  def change
    
    # users table
    create_table :users do |t|      
      t.string :email
      t.string :password_hash
      t.boolean :active, default: true
      t.datetime :last_login_at
      t.integer :login_count
      t.string :auth_token 
      t.timestamps     
    end
    
  end
end
