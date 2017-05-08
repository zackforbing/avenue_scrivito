class HomePage < Obj
  attribute :title, :string
  attribute :logo, :reference
  attribute :body, :widgetlist
  attribute :child_order, :referencelist
  attribute :tags, :stringlist
end
