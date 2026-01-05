class StoresController < ApplicationController
  def index
    @stores = Store.all
    @page_category = "Stores"
  end

  def show
    @store = Store.find(params[:id])
    @page_category = "Stores"
  end

  def by_focus
    focus_value = params[:focus].downcase
    # Check if focus matches exactly OR if focus contains the search term (for array strings)
    # This handles both single values like "Curated" and array strings like "[\"Record Cafe\", \"Genre-specific\", \"Curated\"]"
    # We check for the term with quotes around it to match array values more precisely
    @stores = Store.where(
      "LOWER(focus) = ? OR LOWER(focus) LIKE ?",
      focus_value,
      "%\"#{focus_value}\"%"
    )
    @filter_type = "Focus"
    @filter_value = params[:focus].capitalize
    @page_category = "Stores"
    Rails.logger.info "Filtering stores by focus: #{focus_value}, found: #{@stores.count}"
  end

  def by_area
    area_value = params[:area]
    # Case-insensitive search - capitalize to match database values
    @stores = Store.where("LOWER(area) = ?", area_value.downcase)
    @filter_type = "Area"
    @filter_value = area_value.capitalize
    @page_category = "Stores"
    Rails.logger.info "Filtering stores by area: #{area_value}, found: #{@stores.count}"
  end
end
