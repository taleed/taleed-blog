import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export type Editor = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  speciality: string;
  password: string;
  field: string;
  avatar_url: string;
  confirm_password: string;
  linkedin_account: string;
  twitter_account: string;
  facebook_account: string;
  about: string;
};

export type EditorProps = {
  register: UseFormRegister<Editor>;
  setValue?: UseFormSetValue<Editor>;
  control?: Control<Editor, object>;
  watch?: UseFormWatch<Editor>;
  errors: FieldErrors<Editor>;
};
