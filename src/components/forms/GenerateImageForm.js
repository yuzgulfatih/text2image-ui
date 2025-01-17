import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../form-elements/InputField";
import GenerateImageButton from "../buttons/GenerateImageButton";
import FormTitle from "../titles/FormTitle";
import GenerateFormInputLabel from "../labels/GenerateFormInputLabels";
import axios from "axios";
import { useLoading } from "../../contexts/LoadingContext";

export default function GenerateImageForm({ onImageUrlChange }) {
  const { isLoading, setIsLoading } = useLoading();
  
  const validationSchema = Yup.object({
    prompt: Yup.string().required("Please enter a prompt."),
    negative_prompt: Yup.string().required("Please enter a negative prompt."),
  });

  const initialValues = {
    prompt: "",
    negative_prompt: "",
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://6d3b-35-230-94-75.ngrok-free.app/generate-image",
        {
          prompt: values.prompt,
          negative_prompt: values.negative_prompt,
        }
      );
      console.log(response);
      onImageUrlChange(response.data.image);
    } catch (error) {
      console.error("Error posting to the API:", error);
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
            <FormTitle />

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
