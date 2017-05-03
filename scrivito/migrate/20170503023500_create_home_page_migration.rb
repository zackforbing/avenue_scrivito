class CreateHomePageMigration < Scrivito::Migration
  def up
    HomePage.create({_path: "/", title: "Avenue", body: []})
  end
end
