import { useMutation } from "@tanstack/react-query";

// callback

export const useMutationHook = (fnCallBack) => {
  const mutation = useMutation({
    mutationFn: fnCallBack,
  });
  return mutation;
};
