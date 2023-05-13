//authentication end points

const auth = "/auth/";
export const urlForAuth = {
  registration: `${auth}signup`,
  login: `${auth}login`,
  getPublicUserprofile: `${auth}profile`,
  updateUser: `${auth}profile/update-bio`,
  resetPassword: `${auth}reset-password`,
  otp: `${auth}verify-email`,
  updateProfileImage: `${auth}profile/update-img`,
  notification: `${auth}notifications`,
  request_reset_Password: `${auth}request-reset-password`,
};

//user endpoints
const userurl = "/users/";
export const urlForUsers = {
  getUserDetails: `${userurl}find`,
};

//wallet end points
const wallet = "/wallets";
export const wallets_endpoint = {
  addFunds: `${wallet}/add`,
  withdrawFunds: `${wallet}/withdraw`,
  updateWalletBalance: `${wallet}/update`,
  getWalletBalance: `${wallet}`,
};

//transactions end points
const transaction = "/transactions";
export const transactions_endpoint = {
  getUserTransactions: `${transaction}`,
};

//payment
export const payment = {
  pay: "/paystack/pay",
};
//contact us
export const contact = {
  contactUs: "/contact-us",
};

//admin  users endpoints
const users = "/admin/users";
export const user_url = {
  allusers: `${users}?page=`,
  activeUsers: `${users}/active-users?page=`,
  inactiveUsers: `${users}/inactive-users?page=`,
  blockedUsers: `${users}/blocked-users?page=`,
  blockUsers: `${users}`,
  unblockUsers: `${users}`,
};

//admin spaces
const spaces = "/admin/groups";
export const getspaces_endpoint = {
  allSpaces: `${spaces}?page=`,
  pendingSpaces: `${spaces}/pending-spaces?page=`,
  approvedSpaces: `${spaces}/approved-spaces?page=`,
};
