get '/' do
  erb :index
end

post '/events' do
  Event.create(params)
  params
end

get '/db' do
  # p "you hit the db route"
  @events = Event.all
  @events.to_json
end

get "/auth" do
  redirect client.auth_code.authorize_url(:redirect_uri => redirect_uri,:scope => SCOPES,:access_type => "offline")
end

get '/oauth2callback' do
  access_token = client.auth_code.get_token(params[:code], :redirect_uri => redirect_uri)
  puts "**********#{access_token.params}"
  session[:access_token] = access_token.token
  @message = "Successfully authenticated with the server"
  @access_token = session[:access_token]
  @email = access_token.get('https://www.googleapis.com/userinfo/email?alt=json').parsed
  session.delete(:access_token)
  erb :index
end

get '/sign_out' do #google keeps your authorization cached
  session.clear
  redirect '/'
end


