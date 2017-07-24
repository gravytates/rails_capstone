class ParksController < ApplicationController


  def index
    @parks = Park.get_parks
    respond_to do |format|
      format.html
      format.json { render json: @parks }
    end
  end

end
