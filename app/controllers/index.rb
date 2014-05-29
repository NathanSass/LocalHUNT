get '/' do
  erb :index
end

post '/events' do
  Event.create(params)
end

get '/db' do
  events = Event.all
  p ('* ')* 30
  p events.to_json
  p ('* ')* 30
  events.to_json

end

post '/events/update' do
	initial_lat    = params['initialPos']['latitude']
	initial_long   = params['initialPos']['longitude']
	end_lat        = params['endPos']['latitude']
	end_long       = params['endPos']['longitude']
	
	current_marker = Event.where('latitude = ? AND longitude = ?', initial_lat, initial_long).last
	current_marker.update_attributes(latitude: end_lat, longitude: end_long)
end