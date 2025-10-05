import { useUnAuthenticatedModal } from "components/modals/unauthenticated-action-modal";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useCreateQuotationMutation } from "services/quotation-api";

const useQuotation = (productVariantId: string, userId?: string) => {
  const { setIsOpen: openUnAuthenticatedModal } = useUnAuthenticatedModal();
  const { enqueueSnackbar } = useSnackbar();
  const [createQuotation, { isLoading: isCreatingQuotation, isSuccess }] =
    useCreateQuotationMutation();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("The quotation request has been sent to Tradez", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }, [enqueueSnackbar, isSuccess]);

  const requestQuota = () => {
    if (!userId) {
      openUnAuthenticatedModal(true);
      return;
    }
    createQuotation({ userId, body: { productVariantId } });
  };
  return { requestQuota, isCreatingQuotation };
};

export default useQuotation;
