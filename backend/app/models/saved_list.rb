class SavedList < ApplicationRecord
    belongs_to :user
    belongs_to :gif
end
