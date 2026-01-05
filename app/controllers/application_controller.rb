class ApplicationController < ActionController::Base
  before_action :set_navbar_areas

  private

  def set_navbar_areas
    # Get unique areas from spaces (using neighborhood field)
    @spaces_areas = Space.where.not(neighborhood: nil).where.not(neighborhood: "").distinct.pluck(:neighborhood).compact.sort
    # Get unique areas from stores (using area field)
    @stores_areas = Store.where.not(area: nil).where.not(area: "").distinct.pluck(:area).compact.sort
  end
end
