export const SessionOption = {
  password: process.env.SECRET!,
  cookieName: "zoro-code-test",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
