class SpacesController < ApplicationController
  def index
    @spaces = Space.all
    @page_category = "Spaces"
  end

  def show
    @space = Space.find(params[:id])
    @page_category = "Spaces"
  end

  def by_style
    style_value = params[:style].downcase
    @spaces = Space.where("LOWER(style) = ?", style_value)
    @filter_type = "Style"
    @filter_value = params[:style].capitalize
    @page_category = "Spaces"
    Rails.logger.info "Filtering spaces by style: #{style_value}, found: #{@spaces.count}"
  end

  def by_area
    area_value = params[:area].downcase
    @spaces = Space.where("LOWER(neighborhood) = ?", area_value)
    @filter_type = "Area"
    @filter_value = params[:area].capitalize
    @page_category = "Spaces"
    Rails.logger.info "Filtering spaces by area: #{area_value}, found: #{@spaces.count}"
  end
end
