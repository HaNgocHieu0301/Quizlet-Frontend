type reducer = {
  auth: { checkLogin: boolean };
};

export const checkLoginSelector = (state: reducer) => state.auth.checkLogin;
