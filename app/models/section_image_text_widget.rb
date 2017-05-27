class SectionImageTextWidget < Widget
  attribute :text, :html
  attribute :image, :reference
  attribute :text_color, :html
  attribute :text_position, :enum, values: ['top','center','bottom'], default: 'top'

  def column_size(image)
    self.container.column_size(image)
  end

  def section_style
    styles = "background: url(#{image.binary_url}) top center 0 no-repeat; z-index: -1; background-size: cover;" if image.present?
    return styles
  end

  def position_class
    "scrivito-t-image-position-#{image_position}"
  end

  def text_position_class
    "scrivito-text-position-#{text_position}"
  end
end
