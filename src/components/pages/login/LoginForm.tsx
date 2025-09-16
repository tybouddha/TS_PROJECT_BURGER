import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoChevronForward } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import TextInput from "@/components/reusable-ui/TextInput";
import Button from "@/components/reusable-ui/Button";
import { theme } from "@/theme/theme";
import { authenticateUser } from "@/api/user";
import Welcome from "./Welcome";
import { BiLoader } from "react-icons/bi";

export default function LoginForm() {
  // state
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // comportements
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const userReceived = await authenticateUser(username);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUsername("");
    navigate(`order/${userReceived.username}`);

    setIsLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // affichage
  return (
    <LoginFormStyled action="submit" onSubmit={handleSubmit}>
      <Welcome />
      <div>
        <TextInput
          value={username}
          onChange={handleChange}
          placeholder={"Entrez votre prénom"}
          required
          Icon={<BsPersonCircle />}
          className="input-login"
          version="normal"
          disabled={isLoading}
        />

        <Button
          label="Accéder à mon espace"
          Icon={<IoChevronForward />}
          LoadingIcon={<BiLoader />}
          disabled={isLoading}
          isLoading={isLoading}
          loaderDelay={500}
        />
      </div>
    </LoginFormStyled>
  );
}

const LoginFormStyled = styled.form`
  text-align: center;
  max-width: 500px;
  min-width: 400px;
  margin: 0px auto;
  padding: 40px ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.round};
  font-family: "Amatic SC", cursive;

  hr {
    border: 1.5px solid ${theme.colors.loginLine};
    margin-bottom: ${theme.gridUnit * 5}px;
  }

  h1 {
    color: ${theme.colors.white};
    font-size: ${theme.fonts.size.P5};
  }

  h2 {
    margin: 20px 10px 10px;
    color: ${theme.colors.white};
    font-size: ${theme.fonts.size.P4};
  }

  .input-login {
    margin: 18px 0; // must be handled in Parent
  }
`;
