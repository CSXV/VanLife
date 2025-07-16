import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "./api";

export async function action(obj: any) {
  const formData = await obj.request.formData();
  const url =
    new URL(obj.request.url).searchParams.get("redirectTo") || "/host";

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("isLoggedIn", true);

    const response = redirect(url);
    response.body = true;

    return response;
  } catch (error) {
    return error.message;
  }
}

export function loginLoader({ request }: any) {
  return new URL(request.url).searchParams.get("message");
}

function Login() {
  const message = useLoaderData();
  const errorMessage = useActionData();
  const navigate = useNavigation();

  return (
    <div className="login-container">
      <h1>sign in to your account</h1>

      {message && <h3 className="red">{message}!</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}

      <Form className="login-form" method="post" replace>
        <input name="email" type="email" placeholder="email address" />

        <input name="password" type="password" placeholder="password" />

        <button disabled={navigate.state === "submitting"}>
          {navigate.state === "submitting" ? "Logging in..." : "login"}
        </button>
      </Form>
    </div>
  );
}

export default Login;
