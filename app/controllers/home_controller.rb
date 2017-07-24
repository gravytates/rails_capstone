class HomeController < ApplicationController
  def index
    @votes = Vote.totals

    respond_to do |format|
      format.html
      format.json { render json: @votes }
    end
  end

end
