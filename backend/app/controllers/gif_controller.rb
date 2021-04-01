class GifController < ApplicationController
  def index
    # head 200
    @gifs = Gif.all
    render json: { data: @gifs, status: 200 }
  end
end
