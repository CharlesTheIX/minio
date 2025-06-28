import getApiParams from "../getApiParams";
import { defaultInternalHeader, response_SERVER_ERROR } from "@/globals";

type Props = {
  participants: string[];
  options: any;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { participants, options } = props;
  const params = getApiParams(options);

  try {
    const response: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/by-participants`, {
      method: "POST",
      headers: defaultInternalHeader,
      body: JSON.stringify({ participants, params }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return response_SERVER_ERROR;
  }
};
