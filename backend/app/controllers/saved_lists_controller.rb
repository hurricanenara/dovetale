class SavedListsController < ApplicationController
    def index
        render json: { message: "saved-list index", status: 200 }
    end

    def create
        # token = params[:access_token]|| request.headers['X-Authorization']
        gif_id = params[:gif_id]
        # id = JWT.decode(token, Rails.application.credentials.key, true, { algorithm: 'HS256' })[0]['user_id']
        @current_user = current_user
        @record = SavedList.new(user_id: @current_user.id, gif_id: gif_id)
        if !SavedList.exists?(user_id: @current_user.id, gif_id: gif_id)
            if @record.save
                render json: { message: "saved gif" }
            end
        else
            render json: {message: "already saved"}
        end
    end
end
