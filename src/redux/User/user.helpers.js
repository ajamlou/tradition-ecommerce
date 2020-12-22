import { auth } from "./../../firebase/utils";

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: "http://localhost:3000/login",
  };

  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        if (!email) {
          const err = ["Ange en mailadress"];
          reject(err);
        } else {
          const err = [
            "Det verkar som att din mailadress inte finns registrerad hos oss",
          ];
          reject(err);
        }
      });
  });
};
