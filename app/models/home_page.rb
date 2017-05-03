class HomePage < Obj
  attribute :title, :string
  attribute :image, :reference
  attribute :body, :widgetlist
  attribute :child_order, :referencelist
  attribute :tags, :stringlist
end
