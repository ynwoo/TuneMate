import { login } from "@/api/user";
import { storage } from "@/utils/storage";
import { useEffect } from "react";

const LoginPage = () => {
  if (typeof window !== "undefined") {
    storage.setAccessToken(
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjYjg5OWJjOC0zM2E5LTQzYTYtOTM4Yy03NmIwZWMyODZjNzciLCJleHAiOjE2OTkyMzU0OTgsImlzcyI6IlR1bmVtYXRlIn0.Zp8a4Q4w93YHGMXiGWfhctRJkfXI6iXI6bE59vrIxizxuW7Ktf7THkJGS389CkaR"
    );
  }

  const onLogin = () => {
    login().then((data) => {
      console.log(data);
    });
  };

  useEffect(() => {}, []);
  return (
    <div>
      <p>loginPage</p>
      <a href="http://k9a603.p.ssafy.io:8000/api/v1/user-service/oauth2/authorization/spotify">
        login
      </a>
      <br />
      <button onClick={onLogin}>login</button>
    </div>
  );
};

export default LoginPage;
