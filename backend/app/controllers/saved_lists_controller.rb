class SavedListsController < ApplicationController
    def create
        gif_id = params[:gif_id]
        @current_user = current_user
        @record = SavedList.new(user_id: @current_user.id, gif_id: gif_id)
        begin
            @record.save
        rescue ActiveRecord::RecordNotUnique
            render json: { message: "already saved" }
        end
        
    end

    def destroy
        @current_user = current_user
        @record = @record = SavedList.find_by(user_id: @current_user.id, gif_id: params[:id])
        if @record
            @record.destroy
            render json: { message: 'gif unsaved successfully' }
        else
            render json: { message: 'error while destroying' }
        end
    end
end
