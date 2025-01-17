import { useState } from "react";
import GenerateImageForm from "../components/forms/GenerateImageForm";
import { useLoading } from "../contexts/LoadingContext";
import Loader from "../components/loaders/Loader";

export default function GeneratePage() {
  const [image, setImageUrl] = useState("");
  const { isLoading } = useLoading();

  const handleImageUrlChange = (url) => {
    setImageUrl(url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 via-pink-100 to-blue-100 p-8">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl space-y-8 md:space-y-0 md:space-x-16">
        <div className="w-full md:w-1/2">
          <GenerateImageForm onImageUrlChange={handleImageUrlChange} />
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          {isLoading ? (
            <Loader />
          ) : (
            <img
              src={
                image
                  ? `data:image/png;base64,${image}`
                  : "https://eu-images.contentstack.com/v3/assets/blt6b0f74e5591baa03/bltfd36e68ac7a0f3b2/651b29bb3671b45abcc7e4c8/Generative_AI_(2).png"
              }
              alt="Generated Preview"
              className="w-full h-auto object-cover rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          )}
        </div>
      </div>
    </div>
  );
}
