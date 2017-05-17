class ImageWidget < Widget
  attribute :image, :reference

  def column_size(image)
    self.container.column_size(image)
  end
end
