import React from "react";
import { useToast } from "@/components/ui/toast";
import {
  Toast as ToastComponent,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast";
import { toastProps } from "@/src/types/types";

export const useShowToast = () => {
  const toast = useToast();

  return ({
    action,
    variant,
    placement,
    toastTitle,
    toastDescription,
  }: toastProps) => {
    toast.show({
      placement,
      render: ({ id }): React.ReactNode => (
        <ToastComponent nativeID={id} action={action} variant={variant}>
          <ToastTitle>{toastTitle}</ToastTitle>
          <ToastDescription>{toastDescription}</ToastDescription>
        </ToastComponent>
      ),
    });
  };
};
