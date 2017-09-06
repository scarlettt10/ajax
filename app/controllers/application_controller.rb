class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def render_error(model)
    err = model.errors.full_messages.join(',')
    render json: { errors: err }, status: 422
  end
end
