import ImageCarousel from './ImageCarousel'

function FishGalleryCarousel({ images }) {
  if (!images?.length) return null

  return (
    <div className="fh-fish-carousel" data-reveal>
      <ImageCarousel
        images={images}
        cover={images[0]}
        alt="Рыба водохранилища"
        className="fh-image-carousel fh-image-carousel--fish"
        showNav
        fit="contain"
      />
    </div>
  )
}

export default FishGalleryCarousel
