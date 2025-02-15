import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

const { CATALOGPAGEDATA_API } = catalogData;

export const getCatalogPageData = async (categoryId) => {
  const result = [];
  try {
    const response = await apiConnector("POST", CATALOGPAGEDATA_API, {
      categoryId: categoryId,
    });
    return response?.data?.data;
  } catch (error) {
    console.log("Catalog page data error: ", error);
    toast.error(error?.response?.data?.message);
  }
  return result;
};
