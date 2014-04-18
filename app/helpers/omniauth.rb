SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email'
].join(' ')

def client
  client ||= OAuth2::Client.new('765378257525.apps.googleusercontent.com', 'qZvfnHYEuCUD1NQLCSb4X6u0', {
                :site => 'https://accounts.google.com',
                :authorize_url => "/o/oauth2/auth",
                :token_url => "/o/oauth2/token"
              })
end

def redirect_uri
  uri = URI.parse(request.url)
  uri.path = '/oauth2callback'
  uri.query = nil
  uri.to_s
end