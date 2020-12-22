import userTypes from "./user.types";
import {
  auth,
  handleUserProfile,
  GoogleProvider,
} from "./../../firebase/utils";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS,
});

export const signInUser = ({ email, password }) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: userTypes.SIGN_IN_SUCCESS,
      payload: true,
    });
  } catch (err) {
    const error = ["Lösenordet och/eller emailadressen stämmer inte överens"];
    dispatch({
      type: userTypes.SIGN_IN_ERROR,
      payload: [error],
    });
  }
};

export const signUpUser = ({
  displayName,
  email,
  password,
  confirmPassword,
}) => async (dispatch) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (password !== confirmPassword) {
    const err = ["Lösenorden stämmer inte överens"];
    dispatch({
      type: userTypes.SIGN_UP_ERROR,
      payload: [err],
    });
    return;
  }
  if (password.length < 6) {
    const err = ["Lösenordet måste vara längre än sex tecken"];
    dispatch({
      type: userTypes.SIGN_UP_ERROR,
      payload: [err],
    });
    return;
  }
  if (!re.test(String(email).toLowerCase())) {
    const err = ["Du måste ange en giltig mailadress"];
    dispatch({
      type: userTypes.SIGN_UP_ERROR,
      payload: [err],
    });
    return;
  }

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await handleUserProfile(user, { displayName });
    dispatch({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: true,
    });
  } catch (err) {
    dispatch({
      type: userTypes.SIGN_UP_ERROR,
      payload: [
        "Något gick fel. Testa med en annan mailadress eller försök igen senare.",
      ],
    });
    console.log(err);
  }
};

export const resetPassword = ({ email }) => async (dispatch) => {
  const config = {
    url: "http://localhost:3000/login",
  };

  try {
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        dispatch({
          type: userTypes.RESET_PASSWORD_SUCCESS,
          payload: true,
        });
      })
      .catch(() => {
        if (!email) {
          const err = ["Ange en mailadress"];
          dispatch({
            type: userTypes.RESET_PASSWORD_ERROR,
            payload: [err],
          });
        } else {
          const err = [
            "Det verkar som att din mailadress inte finns registrerad hos oss",
          ];
          dispatch({
            type: userTypes.RESET_PASSWORD_ERROR,
            payload: [err],
          });
        }
      });
  } catch (err) {
    // console.log(err);
  }
};

export const signInWithGoogle = () => async (dispatch) => {
  try {
    await auth.signInWithPopup(GoogleProvider).then(
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true,
      })
    );
  } catch (err) {
    console.log(err);
  }
};
