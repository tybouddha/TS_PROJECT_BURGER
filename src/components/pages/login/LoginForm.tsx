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
import * as z from "zod";

const UsernameSchema = z
  .string()
  .nonempty({ message: "Veuillez entrer un prénom" })
  .min(2, { message: "Le prénom doit contenir au moins 2 caractères." })
  .max(20, { message: "Le prénom ne peut pas dépasser 20 caractères." })
  .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/, {
    message: "Le prénom ne doit contenir que des lettres ou -",
  });

export default function LoginForm() {
  // state
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // comportements
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = UsernameSchema.safeParse(username);
    if (!result.success) {
      setHasError(true);
      setErrorMessage(result.error.issues[0].message);
      return;
    }
    setHasError(false);
    setErrorMessage("");

    setIsLoading(true);

    const userReceived = await authenticateUser(username);

    setTimeout(() => {
      setUsername("");
      navigate(`order/${userReceived.username}`);
    }, 3000);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    //Pour effacer l'erreur lorsque l'utilisateur tape dans le champ
    if (hasError) {
      setHasError(false);
      setErrorMessage("");
    }
  };

  // affichage
  return (
    <LoginFormStyled action="submit" onSubmit={handleSubmit}>
      <Welcome />
      <div>
        <div className="input-container">
          <TextInput
            value={username}
            onChange={handleChange}
            placeholder={"Entrez votre prénom"}
            Icon={<BsPersonCircle />}
            className="input-login"
            version="normal"
          />
          <span className="error">{errorMessage}</span>
        </div>
        <Button
          label={"Accéder à mon espace"}
          Icon={<IoChevronForward />}
          isLoading={isLoading}

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

  .input-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .input-login {
    margin: 18px 0; // must be handled in Parent
  }
  .error {
    color: red;
    font-size: ${theme.fonts.size.P0};
    font-family: ${theme.fonts.family.openSans};
    margin-bottom: 18px;
  }
`;
