get '/' do
  erb :index
end

post '/events' do
  Event.create(params)
  params
end

get '/db' do
  @events = Event.all
  @events.to_json
end

get "/auth" do
  redirect client.auth_code.authorize_url(:redirect_uri => redirect_uri,:scope => SCOPES,:access_type => "offline")
end

get '/oauth2callback' do
  access_token = client.auth_code.get_token(params[:code], :redirect_uri => redirect_uri)
  session[:access_token] = access_token.token
  @access_token = session[:access_token]
  @email = access_token.get('https://www.googleapis.com/userinfo/email?alt=json').parsed
  session.delete(:access_token)
  erb :index
end

get '/sign_out' do
  session.clear
  redirect '/'
end


