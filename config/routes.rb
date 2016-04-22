Rails.application.routes.draw do
  
  # go to the angular application
  root to: 'application#angular'
  
  # authentication route to generate token
  post 'auth' => 'auth#authenticate'
  post 'auth/check_login' => 'auth#check_login'
  
end
