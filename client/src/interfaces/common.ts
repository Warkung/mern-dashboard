import { CreateResponse, UpdateResponse } from "@refinedev/core";
import { FormEventHandler, ReactNode } from "react";
import { FieldValues } from "react-hook-form";

export interface CustomButtonProps {
  type?: string;
  title: string;
  backgroundColor: string;
  color: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
}

export interface FormProps {
  type?: string;
  register: any;
  onFinish: (
    values: FieldValues
  ) => Promise<void | CreateResponse | UpdateResponse>;
  formLoading: boolean;
  handleSubmit?: FormEventHandler<HTMLFormElement> | undefined;
  handleImageChange: (file: File) => void;
  onFinishHandler: (values: FieldValues) => Promise<void>;
  propertyImage: { name: string; url: string };
  // optional initial value for property type (useful when editing a property)
  initialPropertyType?: string;
  // optional raw property data (used by pages when editing)
  propertyData?: any;
}

export interface PropertyCardProps {
  id: string;
  title: string;
  description: string;
  propertyType: string;
  price: number;
  location: string;
  photo: string;
}
