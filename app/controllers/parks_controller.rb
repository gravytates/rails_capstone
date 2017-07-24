class ParksController < ApplicationController

  @@data = File.read("app/views/parks/park_data.json")

  def index
    respond_to do |format|
      format.html
      format.json { render json: @@data }
    end
  end

end
