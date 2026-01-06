import SignIn from "@/page/auth/Sign-in";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePaths";
import Dashboard from "@/page/workspace/Dashboard";
import AccountSetting from "@/page/setting/Account-setting";
import HistoryOrder from "@/page/historyorder/HistoryOrder";
import Product from "@/page/product/Product";
import SignUp from "@/page/auth/Sign-up";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.WORKSPACE, element: <Dashboard /> },
  { path: PROTECTED_ROUTES.PRODUCT, element: <Product /> },
  { path: PROTECTED_ROUTES.HISTORYORDER, element: <HistoryOrder /> },
  { path: PROTECTED_ROUTES.SETTING_ACCOUNT, element: <AccountSetting /> },
];
