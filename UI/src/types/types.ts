export type RootStackParamList = {
  Home: undefined;
  Signin: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  LocationPermission: undefined;
};

export interface user {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface toastProps {
  action: "warning" | "error" | "success" | "info" | "muted" | undefined;
  variant: "outline" | "solid" | undefined;
  placement:
    | "top"
    | "top right"
    | "top left"
    | "bottom"
    | "bottom left"
    | "bottom right";
  toastTitle: string;
  toastDescription: string;
}
