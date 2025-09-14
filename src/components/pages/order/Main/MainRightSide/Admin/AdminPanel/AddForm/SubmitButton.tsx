import Button from "@/components/reusable-ui/Button";
import SubmitMessage from "./SubmitMessage";

type SubmitButtonPropsType = {
  isSubmitted: boolean;
};

export default function SubmitButton({ isSubmitted }: SubmitButtonPropsType) {
  return (
    <>
      <Button
        className="submit-button"
        label={"Ajouter un nouveau produit au menu"}
        version="success"
      />
      {isSubmitted && <SubmitMessage />}
    </>
  );
}
