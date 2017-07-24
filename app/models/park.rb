class Park < ApplicationController
  def self.get_parks
    JSON.parse(RestClient.get 'https://opendata.arcgis.com/datasets/03c05d0d0b0243c1be34f1c7e5c9bb40_35.geojson')
  end
end
