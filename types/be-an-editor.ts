import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export type BeAnEditorFormFields = {
  first_name: string;
  last_name: string;
  username: string;
  field: string;
  speciality: string;
  about: string;
  facebook_account: string;
  linkedin_account: string;
  twitter_account: string;
  avatar_url: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type BeAnEditorStepProps = {
  register: UseFormRegister<BeAnEditorFormFields>;
  setValue?: UseFormSetValue<BeAnEditorFormFields>;
  control?: Control<BeAnEditorFormFields, object>;
  watch?: UseFormWatch<BeAnEditorFormFields>;
  errors: FieldErrors<BeAnEditorFormFields>;
};
