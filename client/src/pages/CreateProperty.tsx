import { useGetIdentity } from "@refinedev/core";
import { Form } from "../components";

export default function CreateProperty() {
  const { data: user } = useGetIdentity();
  

  return <Form type="create" />;
}
