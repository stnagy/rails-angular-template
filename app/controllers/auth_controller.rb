class AuthController < ApplicationController
  skip_before_action :authenticate_request, only: [:authenticate] # this will be implemented later
  def authenticate
    user = User.find_by_credentials(params[:email], params[:password]) # you'll need to implement this
    if user
      user.update(auth_token: rand(10 ** 30).to_s.rjust(30,'0'))
      render json: { auth_token: user.generate_auth_token, user: user.id }
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end
  
  # empty route for angular to check the login state of a user
  def check_login
    render json: { login: true }
  end
  
end