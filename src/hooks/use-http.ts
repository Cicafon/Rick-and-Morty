import { useReducer, useCallback } from "react";
import BoxItem from "../models/boxitem";
import Character from "../models/character";

type StateType = {
  data: BoxItem[] | Character | null;
  error: string | null;
  status: string | null;
};

type Action = { type: "SEND" | "SUCCESS" | "ERROR"; payload?: any };

const httpReducer = (state: StateType, action: Action) => {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }
  if (action.type === "SUCCESS") {
    return {
      data: action.payload,
      error: null,
      status: "completed",
    };
  }
  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.payload,
      status: "completed",
    };
  }
  return state;
};

const useHttp = (
  requestFunction: (param?: any) => any,
  startWithpending = false
) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithpending ? "pending" : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async (requestData) => {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", payload: responseData });
      } catch (err: unknown) {
        if (err instanceof Error)
          dispatch({
            type: "ERROR",
            payload: err.message || "Something went wrong!",
          });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
