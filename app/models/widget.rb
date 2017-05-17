class Widget < Scrivito::BasicWidget
  def self.alignments
    %w[left center right]
  end

  def column_size(image)
    self.container.column_size(image)
  end
end
