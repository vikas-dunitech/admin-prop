import { AxiosResponse } from "axios";
import { forEach, get } from "lodash";

export const ResponseHandler = (response: AxiosResponse<any>) => {
  return {
    status: get(response, "data.status", ""),
    statusCode: get(response, "status", 200),
    data: get(response, "data", {}),
    message: get(response, "data.message", ""),
  };
};

export const getKeyMessageFromErrors = (errors: Array<object>, key: string) => {
  let message: string = "";
  forEach(errors, (error) => {
    if (key === get(error, "field", "")) {
      message = get(error, "message", "");
    }
  });
  return message;
};
