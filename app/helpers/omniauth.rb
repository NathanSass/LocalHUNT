SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email'
].join(' ')

def client
  # client ||= OAuth2::Client.new(ENV['GOOGLE_KEY'], ENV['GOOGLE_SECRET'], {
  client ||= OAuth2::Client.new('1094927027734.apps.googleusercontent.com', 'CyXCJa44CvFCEOiehlKfOKJg', {
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

