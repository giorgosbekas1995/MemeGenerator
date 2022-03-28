import { username, password } from "./secrets";
export const GET_MEMES = "RECEIVE_MEMES";
export const NEW_MEME = "NEW_MEME";

function getMemes(json) {
  const memes = json.data;

  return {
    type: GET_MEMES,
    memes,
  };
}

function fetchMemes() {
  return fetch("https://api.imgflip.com/get_memes").then((res) => res.json());
}

export function dispatchMemes() {
  return function (dispatch) {
    return fetchMemes().then((data) => dispatch(getMemes(data)));
  };
}

function newMeme(meme) {
  return {
    type: NEW_MEME,
    meme,
  };
}

function postMemeJson(params) {
  params["username"] = username;
  params["password"] = password;

  const bodyParams = Object.keys(params)
    .map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");

  return fetch("https://api.imgflip.com/caption_image", {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: bodyParams,
  }).then((response) => response.json());
}

export function createMeme(new_meme_object) {
  return function (dispatch) {
    return postMemeJson(new_meme_object).then((new_meme) =>
      dispatch(newMeme(new_meme))
    );
  };
}
