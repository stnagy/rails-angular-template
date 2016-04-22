class User < ActiveRecord::Base
  # BCrypt allows us to access the Password class used to hash the password in the password setter method
  include BCrypt
  before_create :santize_email

  # validations
  validates :email, presence: true, uniqueness: true, format: { with: /\A([\w+\-]\.?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i }
  validates :password_hash, presence: true

  # scopes
  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }

  # return user if correct email and password combination
  # otherwise, return false
  def self.find_by_credentials(email, password)
    user = User.find_by(email: email.downcase)
    return user if user && user.password == password
    return false
  end

  # password getter and setter methods utilizing BCrypt hashing
  # we don't want to store the password in cleartext
  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def generate_auth_token
    payload = { user_id: self.id }
    AuthToken.encode(payload)
  end

  # we don't want to destroy a user account, just make them inactive
  # this method overrides destroy callbacks so the user is not removed from the db
  def destroy
    run_callbacks :destroy do
      self.update(active: false)
    end
  end
  
  def santize_email
    self.email = self.email.downcase
  end

end