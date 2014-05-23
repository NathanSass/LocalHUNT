get '/' do
  erb :index
end

post '/events' do
  Event.create(params)
end

get '/db' do
  @events = Event.all
  @events.to_json
end