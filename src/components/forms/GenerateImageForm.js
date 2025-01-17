import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../form-elements/InputField";
import GenerateImageButton from "../buttons/GenerateImageButton";
import FormTitle from "../titles/FormTitle";
import GenerateFormInputLabel from "../labels/GenerateFormInputLabels";
import axios from "axios";
import { useLoading } from "../../contexts/LoadingContext";
import { useState } from "react";

export default function GenerateImageForm({ onImageUrlChange }) {
  const { isLoading, setIsLoading } = useLoading();
  const [error, setError] = useState(null);
  
  const validationSchema = Yup.object({
    prompt: Yup.string().trim().required("Please enter a prompt."),
    negative_prompt: Yup.string().trim().required("Please enter a negative prompt."),
  });

  const initialValues = {
    prompt: "",
    negative_prompt: "",
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://f7e1-34-87-119-45.ngrok-free.app/generate-image",
        {
          prompt: values.prompt,
          negative_prompt: values.negative_prompt,
        }
      );
      onImageUrlChange(response.data.image);
    } catch (error) {
      console.error("Error posting to the API:", error);
      setError("An error occurred while generating the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form
            className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-lg border-4 border-yellow-400 transform hover:scale-105 transition-transform duration-300 ease-in-out"
            style={{ boxShadow: "10px 10px 0px #ffcb05" }}
          >
            <FormTitle text={"🖼️ Text2Image 🖼️"} />

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="mb-6">
              <GenerateFormInputLabel text="✨ Prompt" />
              <InputField
                type="text"
                id="prompt"
                name="prompt"
                color="yellow"
                boxShadowColor="#ffd700"
                placeholder="What's on your mind?"
                disabled={isLoading}
              />
            </div>

            <div className="mb-6">
              <GenerateFormInputLabel text="🚫 Negative Prompt" />
              <InputField
                type="text"
                id="negative_prompt"
                name="negative_prompt"
                color="blue"
                boxShadowColor="#00f"
                placeholder="Anything to avoid?"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-center">
              <GenerateImageButton disabled={isLoading} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
