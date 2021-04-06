class UsersController < ApplicationController
  skip_before_action :authenticate_user

  def sign_up
    user = User.create!(email: params[:email], password: params[:password])
    payload = { user_id: user.id }
    token = JWT.encode payload, Rails.application.credentials.key, 'HS256'
    render json: { message: 'User Created', token: token }
  rescue ActiveRecord::RecordInvalid => e
    render json: { message: e.message }, status: 400
  end
end
