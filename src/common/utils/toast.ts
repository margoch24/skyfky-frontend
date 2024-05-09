import { Id, toast } from "react-toastify";

export const showToastLoading = (text: string): Id => {
  return toast.loading(text);
};

export const showToastError = (text: string): Id => {
  return toast.error(text);
};

export const updateToastToError = (id: Id, text: string) => {
  toast.update(id, {
    render: text,
    type: "error",
    isLoading: false,
    autoClose: 3000,
  });
};

export const showToastSuccess = (text: string) => {
  toast.success(text);
};

export const dismissToast = (id: Id) => {
  toast.dismiss(id);
};
