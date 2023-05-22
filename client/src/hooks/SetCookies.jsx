import Cookie from "js-cookie";

const SetCookie = (cookiename, value) => {
  Cookie.set(cookiename, value, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
    path: "/",
  });
};

export default SetCookie;
