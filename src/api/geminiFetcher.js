import { fetcher } from "./fetcher";

const BASE_URL = process.env.API_BASE_URL;

export const getQuestion = async (history) => {
  const response = await fetcher(BASE_URL + "question", "POST", {
    history,
  });

  return parseResponse(response);
};

export const getReaction = async (history, question, answer) => {
  const response = await fetcher(BASE_URL + "reaction", "POST", {
    history,
    question,
    answer,
  });

  return parseResponse(response);
};

export const getEvaluate = async (history, sentence, evaluate_type) => {
  const response = await fetcher(BASE_URL + "evaluate", "POST", {
    history,
    sentence,
    evaluate_type,
  });

  return parseResponse(response);
};

const parseResponse = (response) => {
  return {
    prompt: response.prompt,
    response: response.response,
    history: response.history,
  };
};
