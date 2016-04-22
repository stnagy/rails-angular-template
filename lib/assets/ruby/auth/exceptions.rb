module Exceptions
  class NotAuthenticatedError < StandardError; end
  class AuthenticationTimeoutError < StandardError; end
end