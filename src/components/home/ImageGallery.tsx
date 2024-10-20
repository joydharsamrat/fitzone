const ImageGallery = () => {
  const images = [
    "https://i.ibb.co.com/PGdvLLP/gallery1.webp",
    "https://i.ibb.co.com/b5bNs23/gallery2.webp",
    "https://i.ibb.co.com/tDBc6SM/galary3.webp",
    "https://i.ibb.co.com/GFzmZT2/gallery4.webp",
    "https://i.ibb.co.com/JkYjxH8/gallery5.webp",
    "https://i.ibb.co.com/WcJgsmG/gallery6.webp",
    "https://i.ibb.co.com/855Vphs/gallery7.webp",
    "https://i.ibb.co.com/12YMrd0/gallery8.webp",
    "https://i.ibb.co.com/HNDJf5m/gallery9.webp",
    "https://i.ibb.co.com/yyncftq/gallery10.webp",
    "https://i.ibb.co.com/fMvqgpP/gallery11.webp",
    "https://i.ibb.co.com/YRrfxC3/gallery12.webp",
    "https://i.ibb.co.com/fDQJ621/gallery13.webp",
    "https://i.ibb.co.com/N22pf5Q/gallery14.webp",
    "https://i.ibb.co.com/W5prwT6/gallery15.webp",
    "https://i.ibb.co.com/c6Z4ncd/gallery16.webp",
    "https://i.ibb.co.com/DDwWTKS/gallery17.webp",
    "https://i.ibb.co.com/M9T14Xp/gallery18.webp",
    "https://i.ibb.co.com/nkVd0C8/gallery19.webp",
  ];

  return (
    <div className="bg-background-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary-700 text-center mb-8">
          Image Gallery
        </h2>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 lg:gap-8 [&>div:not(:first-child)]:mt-5 lg:[&>div:not(:first-child)]:mt-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-2 bg-neutral-200"
            >
              <img
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
