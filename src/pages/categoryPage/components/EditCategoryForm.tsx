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
        <label>
          Category Name:
          <input
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            required
          />
        </label>
      </div>

      <div>
        <h3>Price Configuration</h3>
        {Object.entries(priceConfiguration).map(
          ([configName, config], index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h4>{configName}</h4>
              <label>
                Price Type:
                <select
                  value={config.priceType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handlePriceConfigurationChange(
                      configName,
                      "priceType",
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="base">Base</option>
                  <option value="additional">Additional</option>
                </select>
              </label>
              <div>
                <h4>Available Options</h4>
                {config.availableOptions.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <span>{option}</span>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddPriceOption(configName)}
                >
                  Add Option
                </button>
              </div>
            </div>
          )
        )}
        <button type="button" onClick={handleAddPriceConfiguration}>
          Add Price Configuration
        </button>
      </div>

      <div className="pt-10">
        <h3>Attributes</h3>
        {attributes.map((attribute, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <label>
              Attribute Name:
              <input
                type="text"
                value={attribute.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleAttributeChange(index, "name", e.target.value)
                }
                required
              />
            </label>
            <label>
              Widget Type:
              <select
                value={attribute.widgetType}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleAttributeChange(index, "widgetType", e.target.value)
                }
                required
              >
                <option value="switch">Switch</option>
                <option value="radio">Radio</option>
              </select>
            </label>
            <label>
              Default Value:
              <input
                type="text"
                value={attribute.defaultValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleAttributeChange(index, "defaultValue", e.target.value)
                }
                required
              />
            </label>
            <div>
              <h4>Available Options</h4>
              {attribute.availableOptions.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span>{option}</span>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddAttributeOption(index)}
              >
                Add Option
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddAttribute}>
          Add Attribute
        </button>
      </div>

      <button type="submit">Update Category</button>
    </form>
  );
};

export default EditCategoryForm;
