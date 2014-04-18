# def oauth_client
#   raise RuntimeError, "You must set GOOGLE_KEY and GOOGLE_SECRET in your server environment." unless ENV['GOOGLE_KEY'] and ENV['GOOGLE_SECRET']
#   @client ||= OAuth2::Client.new(
#     ENV['GOOGLE_KEY'],
#     ENV['GOOGLE_SECRET'],
#     :site => 'https://accounts.google.com',
#     :token_url => '/o/oauth2/token',
#     :authorize_url => '/o/oauth2/auth'
#   )
# end

# def client
#   client ||= OAuth2::Client.new('AIzaSyBRqgjirS3js0h7krnvT_C9x7RrhRgZ2Ig', 'qZvfnHYEuCUD1NQLCSb4X6u0', {
#                 :site => 'https://accounts.google.com',
#                 :authorize_url => "/o/oauth2/auth",
#                 :token_url => "/o/oauth2/token"
#               })
# end


# def request_token
#   if not session[:request_token]
#     # this 'host_and_port' logic allows our app to work both locally and on Heroku
#     host_and_port = request.host
#     host_and_port << ":9393" if request.host == "localhost"

#     # the `oauth_consumer` method is defined above
#     session[:request_token] = oauth_client.get_token(
#       :oauth_callback => "http://#{host_and_port}/auth"
#     )
#   end
#   session[:request_token]
# end