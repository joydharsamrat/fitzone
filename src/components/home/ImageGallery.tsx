import { TImage } from "../../interface";
import { useGetAllImagesQuery } from "../../redux/features/imageGallery/imageGallery.api";
import ImageSkeleton from "../shared/loaders/ImagesSkeleton";

const ImageGallery = () => {
  const { data, isLoading } = useGetAllImagesQuery(undefined);

  const images: TImage[] = data?.data || [];

  return (
    <div className="bg-background-100 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary-700 text-center mb-8">
          Image Gallery
        </h2>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 lg:gap-8 [&>div:not(:first-child)]:mt-5 lg:[&>div:not(:first-child)]:mt-8">
          {isLoading
            ? Array.from({ length: 12 }).map((_, index) => (
                <ImageSkeleton key={index} />
              ))
            : images.map((image, index) => (
                <div
                  key={index}
                  className="break-inside-avoid overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-2 bg-neutral-200"
                >
                  <img
                    src={image.url}
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
