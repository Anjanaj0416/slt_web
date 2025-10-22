import { Metadata } from "next";
import LoginPageView from "./login-page-view";

export const metadata: Metadata = {
  title: "Tredaz Partner - Login",
  description: "Login page for Tredaz.lk",
  authors: [{ name: "Tredaz.lk", url: "https://tredaz.lk" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function Login() {
  return <LoginPageView/ >;
}
