import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../form-elements/InputField";
import GenerateImageButton from "../buttons/GenerateImageButton";
import FormTitle from "../titles/FormTitle";
import GenerateFormInputLabel from "../labels/GenerateFormInputLabels";
import axios from "axios";

export default function GenerateImageForm({ onImageUrlChange }) {
  const validationSchema = Yup.object({
    prompt: Yup.string().required("Please enter a prompt."),
    negative_prompt: Yup.string().required("Please enter a negative prompt."),
  });

  const initialValues = {
    prompt: "",
    negative_prompt: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/generate-image",
        {
          prompt: values.prompt,
          negative_prompt: values.negative_prompt,
        }
      );
      console.log(response);
      onImageUrlChange(response.data.image);
    } catch (error) {
      console.error("Error posting to the API:", error);
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
              />
            </div>

            <div className="flex items-center justify-center">
              <GenerateImageButton />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}