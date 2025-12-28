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
    area_value = params[:area]
    @spaces = Space.where(neighborhood: area_value)
    @filter_type = "Area"
    @filter_value = area_value
  end
end
