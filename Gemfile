source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.3'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc
# allow templates in angular
gem 'angular-rails-templates'
# Use angular_rails_csrf for CSRF Token Support
gem 'angular_rails_csrf'
# Use Unicorn as the app server
gem 'unicorn'
# Use responders for json respond_to
gem 'responders'
# Use jwt for auth_token support
gem 'jwt', '1.5.2'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

group :production do
  # Use postgres as the database on heroku
  gem 'pg'
  # Use thin for webserver
  gem 'thin'
  # Use rails_12factor for STDOUT logging
  gem 'rails_12factor'
end

group :development, :test do
  # use sqlite3 for development
  gem 'sqlite3'
  # allow regex queries on sqlite3 database
  gem 'sqlite3_ar_regexp', '~> 2.1'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  # gem 'spring'
end

