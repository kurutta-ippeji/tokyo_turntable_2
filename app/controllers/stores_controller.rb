class StoresController < ApplicationController
  def index
    @stores = Store.all
  end

  def show
    @store = Store.find(params[:id])
  end

  def by_focus
    focus_value = params[:focus].downcase
    @stores = Store.where("LOWER(focus) = ?", focus_value)
    @filter_type = "Focus"
    @filter_value = params[:focus].capitalize
    Rails.logger.info "Filtering stores by focus: #{focus_value}, found: #{@stores.count}"
  end

  def by_area
    area_value = params[:area]
    # Case-insensitive search - capitalize to match database values
    @stores = Store.where("LOWER(area) = ?", area_value.downcase)
    @filter_type = "Area"
    @filter_value = area_value.capitalize
    Rails.logger.info "Filtering stores by area: #{area_value}, found: #{@stores.count}"
  end
end
