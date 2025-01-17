import { Field, ErrorMessage } from "formik";

export default function InputField({
  type,
  id,
  name,
  placeholder,
  color,
  boxShadowColor,
  disabled,
}) {
  return (
    <>
      <Field
        type={type}
        id={id}
        name={name}
        className={`w-full px-4 py-3 border-2 border-${color}-400 bg-${color}-50 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-400 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        placeholder={placeholder}
        style={{ boxShadow: `5px 5px 0px ${boxShadowColor}` }}
        disabled={disabled}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 text-sm mt-2 italic font-semibold"
      />
    </>
  );
}
