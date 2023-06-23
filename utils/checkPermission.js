import { UnAuthenticated } from "../errors/index.js";

const checkPermission = (reqUserId, resourceUserId) => {
  if (reqUserId.userId === resourceUserId.toString()) return;

  throw new UnAuthenticated("Not authorized");
};

export default checkPermission;
