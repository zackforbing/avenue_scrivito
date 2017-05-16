class SessionsController < ApplicationController

  def new

  end

  def create
    @user = User.find_by(username: params[:session][:username]) || nil
    if @user && @user.authenticate(params[:session][:password])
      session[:user_id] = @user.id
      redirect_to scrivito_engine_path
    elsif @user
      flash.now[:error] = "Password is incorrect"
      render :new
    else
      flash.now[:error] = "Username is incorrect"
      render :new
    end
  end

  def destroy
    session.clear
    redirect_to scrivito_engine_path
  end
end
