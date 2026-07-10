import ImageCarousel from './ImageCarousel'

function FishGalleryCarousel({
  images,
  alt = 'Рыба водохранилища',
  className = 'fh-image-carousel fh-image-carousel--fish',
  wrapperClassName = 'fh-fish-carousel',
  fit = 'contain',
}) {
  if (!images?.length) return null

  return (
    <div className={wrapperClassName} data-reveal>
      <ImageCarousel
        images={images}
        cover={images[0]}
        alt={alt}
        className={className}
        showNav
        fit={fit}
      />
    </div>
  )
}

export default FishGalleryCarousel
