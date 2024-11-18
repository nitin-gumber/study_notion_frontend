import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

const { CATALOGPAGEDATA_API } = catalogData;

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  const result = [];
  try {
    const response = await apiConnector("POST", CATALOGPAGEDATA_API, {
      categoryId: categoryId,
    });
    toast.dismiss(toastId);
    return response?.data?.data;
  } catch (error) {
    console.log("Catalog page data error: ", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};
