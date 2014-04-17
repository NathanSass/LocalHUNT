get '/' do
  # Look in app/views/index.erb
  # erb :test
  erb :index
end

post '/events' do
  p params
end
