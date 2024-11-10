import { useState, ChangeEvent, FormEvent } from "react";
import { PriceConfiguration, Attribute, Category } from "../../../types";

import { useUpdateCategoryMutation } from "../../../hooks/categories/useUpdateCategoryMutate";

interface EditCategoryFormProps {
  onClose: () => void;
  existedData: Category;
}

const EditCategoryForm = ({ onClose, existedData }: EditCategoryFormProps) => {
  const [name, setName] = useState<string>(existedData.name);
  const [priceConfiguration, setPriceConfiguration] =
    useState<PriceConfiguration>(existedData.priceConfiguration);
  const [attributes, setAttributes] = useState<Attribute[]>(
    existedData.attributes
  );

  const {
    mutate: updateCategoryMutate,
    isError,
    isPending,
    error: err,
  } = useUpdateCategoryMutation();

  // Handlers for price configuration
  const handleAddPriceConfiguration = () => {
    const configName = prompt(
      "Enter name for the new price configuration (e.g., 'Size', 'Crust'):"
    );
    if (configName && !priceConfiguration[configName]) {
      setPriceConfiguration({
        ...priceConfiguration,
        [configName]: { priceType: "base", availableOptions: [] },
      });
    } else if (configName && priceConfiguration[configName]) {
      alert("This configuration already exists.");
    }
  };

  const handlePriceConfigurationChange = (
    configName: string,
    field: keyof PriceConfiguration[string],
    value: string | number
  ) => {
    setPriceConfiguration({
      ...priceConfiguration,
      [configName]: { ...priceConfiguration[configName], [field]: value },
    });
  };

  const handleAddPriceOption = (configName: string) => {
    const option = prompt(`Enter a new option for ${configName}:`);
    if (option) {
      setPriceConfiguration({
        ...priceConfiguration,
        [configName]: {
          ...priceConfiguration[configName],
          availableOptions: [
            ...priceConfiguration[configName].availableOptions,
            option,
          ],
        },
      });
    }
  };

  // Handlers for attributes
  const handleAddAttribute = () => {
    setAttributes([
      ...attributes,
      {
        name: "",
        widgetType: "switch",
        defaultValue: "",
        availableOptions: [],
      },
    ]);
  };

  const handleAttributeChange = (
    index: number,
    field: keyof Attribute,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][field] = value;
    setAttributes(updatedAttributes);
  };

  const handleAddAttributeOption = (index: number) => {
    const option = prompt("Enter a new option for this attribute:");
    if (option) {
      const updatedAttributes = [...attributes];
      updatedAttributes[index].availableOptions.push(option);
      setAttributes(updatedAttributes);
    }
  };

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const updatedCategoryData = {
      ...existedData,
      name,
      priceConfiguration,
      attributes,
    };
    updateCategoryMutate(
      { id: existedData._id, categoryData: updatedCategoryData },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  if (isPending) {
    return <div>Updating Category...</div>;
  }

  if (isError) {
    console.error(err);
    return <div>Error updating category. Check console for details.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Category</h2>

      <div>
        Currently It is in progress, please delete and make new category
      </div>
    </form>
  );
};

export default EditCategoryForm;
