import getApiParams from "../getApiParams";
import { defaultInternalHeader, response_SERVER_ERROR } from "@/globals";

type Props = {
  clerkId: string;
  options: any;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { clerkId, options } = props;
  const params = getApiParams(options);

  try {
    const response: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/by-clerk-id`, {
      method: "POST",
      headers: defaultInternalHeader,
      body: JSON.stringify({ clerkId, params }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return response_SERVER_ERROR;
  }
};
