class GifController < ApplicationController
  def index
    # head 200
    @gifs = Gif.all
    @current_user = current_user
    @saved_gifs = SavedList.where(user_id: @current_user.id).pluck(:gif_id)
    render json: { data: @gifs, saved: @saved_gifs, status: 200 }
  end
end
