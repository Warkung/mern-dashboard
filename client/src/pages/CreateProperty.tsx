import { useGetIdentity } from "@refinedev/core";
import { Form } from "../components";
import { useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";

export default function CreateProperty() {
  const { data: user } = useGetIdentity();
  const [propertyImage, setPropertyImage] = useState({
    name: "",
    url: "",
  });

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPropertyImage({ name: file?.name, url: reader.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  // const handleImageChange = (file: File) => {
  //   const reader = (readerFile: File): Promise<string> => {
  //     return new Promise<string>((resolve, reject) => {
  //       const fileReader = new FileReader();
  //       fileReader.onload = () => {
  //         resolve(fileReader.result as string);
  //       };
  //       fileReader.onerror = reject;
  //       fileReader.readAsDataURL(readerFile);
  //     });
  //   };
  //   if (file) {
  //     reader(file).then((result) => {
  //       setPropertyImage({ name: file.name, url: result });
  //     });
  //   }
  // };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) return alert("Please select an image");
    await onFinish({ ...data, photo: propertyImage.url, email: user?.email });
  };

  return (
    <Form
      type="create"
      register={register}
      onFinish={onFinishHandler}
      formLoading={formLoading}
      handleSubmit={handleSubmit(onFinishHandler)}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      PropertyImages={propertyImage}
    />
  );
}
