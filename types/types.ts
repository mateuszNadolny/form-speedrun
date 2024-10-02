export interface CustomError extends Error {
  response?: {
    data?: string;
  };
}

export interface InputTypes {
  type: string;
  label: string;
  value: string | number;
  options?: string[];
  min?: string;
  max?: string;
}

export interface FormInputProps {
  input: InputTypes;
  onComplete: () => void;
}
