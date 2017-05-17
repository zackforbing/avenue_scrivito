class ImageWidget < Widget
  attribute :image, :reference
  attribute :body, :widgetlist

  def column_size(image)
    self.container.column_size(image)
  end
end
