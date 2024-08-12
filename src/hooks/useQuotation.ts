import { useUnAuthenticatedModal } from "components/modals/unauthenticated-action-modal";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useCreateQuotationMutation } from "services/quotation-api";

const useQuotation = (productId: string, email: string, userId?: string) => {
  const { setIsOpen: openUnAuthenticatedModal } = useUnAuthenticatedModal();
  const { enqueueSnackbar } = useSnackbar();
  const [createQuotation, { isLoading: isCreatingQuotation, isSuccess }] =
    useCreateQuotationMutation();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(`Quotation Requested. Email will be sent to ${email}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }, [enqueueSnackbar, isSuccess, email]);

  const requestQuota = () => {
    if (!userId) {
      openUnAuthenticatedModal(true);
      return;
    }
    createQuotation({ userId, body: { productId } });
  };
  return { requestQuota, isCreatingQuotation };
};

export default useQuotation;
