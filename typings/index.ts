export interface User {
  username: string;
  avatar: string;
}

export type Field = {
  name: string;
  type: "string" | "number" | "boolean" | "array" | "date" | "file";
  component:
    | "input"
    | "select"
    | "checkbox"
    | "checkboxGroup"
    | "datePicker"
    | "fileUpload"
    | "inputGroup";
  options?: string[]; // Optional property for fields that require options
};

export type Step = {
  label: string;
  fields: Field[];
};
