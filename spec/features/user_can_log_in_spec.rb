require 'rails_helper'

RSpec.feature "User can log in" do
  context "user logs in" do
    scenario "user logs in with correct information" do
      user = create(:user)

      visit login_path

      fill_in "Username", with: user.username
      fill_in "Password", with: user.password
      click_on "Login"

      expect(current_path).to eq(scrivito_engine_path)
      expect(page).to have_link("Log out")
    end

    scenario "user logs in with incorrect information" do

      visit login_path

      fill_in "Username", with: "SiteAdmin"
      fill_in "Password", with: "SiteAdmin"
      click_on "Login"

      expect(current_path).to eq(login_path)
    end
  end
end
