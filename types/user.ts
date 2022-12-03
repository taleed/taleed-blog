import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export type User = {
  id: BigInteger;
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  speciality: string;
  avatar_url: string;
  linkedin_account: string;
  twitter_account: string;
  facebook_account: string;
  about: string;
  user_id: BigInteger
};

export type UserProps = {
  register: UseFormRegister<User>;
  setValue?: UseFormSetValue<User>;
  control?: Control<User, object>;
  watch?: UseFormWatch<User>;
  errors: FieldErrors<User>;
};
