class ImageWidget < Widget
  attribute :section_content, :widgetlist
  attribute :image, :reference

  def column_size(image)
    self.container.column_size(image)
  end

  def section_style
    styles = "background: url(#{image.binary_url}) top center 0 no-repeat; z-index: -1; background-size: cover;" if image.present?
    return styles
  end
end
