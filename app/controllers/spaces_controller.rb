class SpacesController < ApplicationController
  def index
    @spaces = Space.all
  end

  def show
    @space = Space.find(params[:id])
  end

  def by_style
    style_value = params[:style].downcase
    @spaces = Space.where("LOWER(style) = ?", style_value)
    @filter_type = "Style"
    @filter_value = params[:style].capitalize
    Rails.logger.info "Filtering spaces by style: #{style_value}, found: #{@spaces.count}"
  end

  def by_area
    area_value = params[:area].downcase
    @spaces = Space.where("LOWER(neighborhood) = ?", area_value)
    @filter_type = "Area"
    @filter_value = params[:area].capitalize
    Rails.logger.info "Filtering spaces by area: #{area_value}, found: #{@spaces.count}"
  end
end
