get '/' do
  # Look in app/views/index.erb
  # erb :test
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


