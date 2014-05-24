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

post '/events/update' do
	p "* " * 30
	p params
	p params["initialPos"]["latitude"]
	p "* " * 30
end