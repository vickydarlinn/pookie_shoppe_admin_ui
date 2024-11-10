import { useState, ChangeEvent, FormEvent } from "react";

import { CreateCategory, Attribute, PriceConfiguration } from "../../../types";
import { useCreateCategoryMutation } from "../../../hooks/categories/useCreateCategoryMutate";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateCategoryTableInt {
  onClose: () => void;
}

const CreateCategoryForm = ({ onClose }: CreateCategoryTableInt) => {
  const [name, setName] = useState<string>("");
  const [priceConfiguration, setPriceConfiguration] =
    useState<PriceConfiguration>({
      crust: {
        priceType: "base",
        availableOptions: ["small", "medium", "big", "xl"],
      },
    });
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [isAttributeFormOpen, setIsAttributeFormOpen] = useState(false);

  const [isConfigurationFormOpen, setIsConfigurationFormOpen] = useState(true);

  const {
    mutate: CreateCategoryMutate,
    isError,
    isPending,
    error: err,
  } = useCreateCategoryMutation();

  // handle attributes

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    if (!name.trim()) {
      alert("Please type name");
      return;
    }
    e.preventDefault();
    const categoryData: CreateCategory = {
      name,
      priceConfiguration,
      attributes,
    };
    CreateCategoryMutate(categoryData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const addAttributes = (attribute: Attribute) => {
    setAttributes((prev) => [...prev, attribute]);
  };
  console.log(priceConfiguration);
  const addConfiguration = (data: PriceConfiguration) => {
    setPriceConfiguration((prevPriceConfig) => ({
      ...prevPriceConfig,
      ...data, // Merge new configuration data into the existing state
    }));
  };

  if (isPending) {
    return <div>Creating Category....</div>;
  }
  if (isError) {
    console.error(err);
    return <div>Check Console...THERE is an error while creating category</div>;
  }
  return (
    <form onSubmit={handleSubmit} className="p-2 h-screen flex flex-col ">
      <h1 className="text-center font-bold py-3 text-lg">Create Category</h1>

      <div className="my-3">
        <Label>
          Category Name:
          <Input
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            required
          />
        </Label>
      </div>
      {/* Configurations */}
      <div className="border border-border p-1">
        <div className="flex  justify-between items-center">
          <h2 className="font-bold">Configurations</h2>
          <Button
            type="button"
            onClick={() => setIsConfigurationFormOpen(true)}
          >
            Add Configuration
          </Button>
        </div>
        <div>
          {Object.entries(priceConfiguration).map(([key, config], index) => (
            <div
              key={index}
              className="p-2 my-2 border border-border flex justify-between"
            >
              <div>
                <h4 className="font-bold capitalize">{key}</h4>
                <p>Type: {config.priceType}</p>
              </div>
              <div>
                <span className="font-bold">Options:</span>
                <ul className="list-disc ml-5">
                  {config.availableOptions.map((option, i) => (
                    <li className="capitalize" key={i}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        {isConfigurationFormOpen && (
          <ConfigurationForm
            onClose={() => setIsConfigurationFormOpen(false)}
            onSubmit={addConfiguration}
          />
        )}
      </div>
      {/* Attributes */}
      <div className="border border-border p-1 my-5">
        <div className="flex  justify-between items-center">
          <h2 className="font-bold">Attributes</h2>
          <Button type="button" onClick={() => setIsAttributeFormOpen(true)}>
            Add Attribute
          </Button>
        </div>
        <div className="my-3">
          {attributes.map((attribute: Attribute, index) => (
            <div
              className="p-2 my-2 border border-border "
              key={`${attribute.name}-${index}`}
            >
              <h4 className="font-bold capitalize">
                {attribute.name ?? "test"}
              </h4>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span>Type: {attribute.widgetType}</span>
                  <span>Default Value: {attribute.defaultValue}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">Options</span>
                  <ul className="list-disc ml-5">
                    {attribute.availableOptions.map((option, i) => (
                      <li className="capitalize" key={i}>
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isAttributeFormOpen && (
          <AttributesForm
            onSubmit={addAttributes}
            onClose={() => setIsAttributeFormOpen(false)}
          />
        )}
      </div>

      <Button
        disabled={isAttributeFormOpen || isConfigurationFormOpen}
        type="submit"
        className="mt-auto"
      >
        Create Category
      </Button>
    </form>
  );
};

export default CreateCategoryForm;

interface CreateAttribute {
  onClose: () => void;
  onSubmit: (attribute: Attribute) => void;
}

const AttributesForm = ({ onSubmit, onClose }: CreateAttribute) => {
  const [attribute, setAttribute] = useState<Attribute>({
    name: "",
    widgetType: "radio",
    defaultValue: null,
    availableOptions: [],
  });
  const [optionInput, setOptionInput] = useState("");

  // Function to handle adding available options for radio type
  const addOption = () => {
    if (optionInput.trim()) {
      setAttribute((prev) => ({
        ...prev,
        availableOptions: [...prev.availableOptions, optionInput],
        defaultValue:
          prev.availableOptions.length === 0 ? optionInput : prev.defaultValue,
      }));
      setOptionInput("");
    }
  };

  const handleSubmit = () => {
    if (!attribute.name.trim()) {
      alert("Attribute name is required");
      return;
    }
    if (
      attribute.widgetType === "radio" &&
      attribute.availableOptions.length === 0
    ) {
      alert("At least one option is required for radio type");
      return;
    }
    onSubmit(attribute);
    onClose();
  };

  const handleCancel = () => {
    setAttribute({
      name: "",
      widgetType: "radio",
      defaultValue: null,
      availableOptions: [],
    });
    onClose();
  };
  return (
    <div className="border border-border p-1">
      <h3 className="font-bold text-center my-2">Create New Attribute</h3>
      <div className="flex items-center  gap-4 my-3">
        <Label className="text-nowrap  w-52">Name:</Label>
        <Input
          onChange={(e) =>
            setAttribute((prev) => ({ ...prev, name: e.target.value }))
          }
          type="text"
        />
      </div>
      <div className="flex items-center  gap-4 my-3">
        <Label className="text-nowrap  w-52">Type:</Label>
        <Select
          value={attribute.widgetType} // Bind the current value to `widgetType`
          onValueChange={(val) =>
            setAttribute((prev) => ({
              ...prev,
              widgetType: val as "radio" | "switch",
              defaultValue: null,
              availableOptions: [],
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Attribute type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="radio">Radio</SelectItem>
            <SelectItem value="switch">Switch</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <RadioGroup
        value={attribute.defaultValue || attribute.availableOptions[0]}
        onValueChange={(val) =>
          setAttribute((prev) => ({ ...prev, defaultValue: val }))
        }
        className=" flex flex-col p-2 gap-5"
      >
        {attribute.availableOptions.map((option, index) => (
          <div className="flex items-center gap-1" key={`${option}-${index}`}>
            <RadioGroupItem value={option} id={`${option}-${index}`} />
            <Label htmlFor={`${option}-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>

      {attribute.widgetType && (
        <div
          className={` gap-2 ${
            attribute.widgetType === "switch" &&
            attribute.availableOptions.length >= 2
              ? "hidden"
              : "flex"
          }`}
        >
          <Input
            value={optionInput}
            onChange={(e) => setOptionInput(e.target.value)}
            type="text"
            className="border p-2 w-1/3"
            placeholder="Add an option"
          />
          <Button type="button" onClick={addOption}>
            Add Option
          </Button>
        </div>
      )}
      <div className="flex justify-end gap-2 mt-2">
        <Button
          type="button"
          onClick={handleCancel}
          className=" text-background bg-foreground  w-1/4"
        >
          Cancel
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Create Attribute
        </Button>
      </div>
    </div>
  );
};

interface CreateConfiguration {
  onClose: () => void;
  onSubmit: (data: PriceConfiguration) => void;
}
const ConfigurationForm = ({ onClose, onSubmit }: CreateConfiguration) => {
  const [confName, setConfName] = useState("");
  const [optionInput, setOptionInput] = useState("");

  const [configuration, setConfiguration] = useState<{
    priceType: "base" | "additional";
    availableOptions: string[];
  }>({
    priceType: "base",
    availableOptions: [],
  });

  const addOption = () => {
    if (optionInput.trim()) {
      setConfiguration((prev) => ({
        ...prev,
        availableOptions: [...prev.availableOptions, optionInput],
      }));
      setOptionInput("");
    }
  };
  const handleCancel = () => {
    setConfName("");
    setConfiguration({
      priceType: "base",
      availableOptions: [],
    });
    onClose();
  };
  const handleSubmit = () => {
    if (!confName.trim()) {
      alert("Configuration name is required");
      return;
    }
    if (configuration.availableOptions.length === 0) {
      alert("At least one option is required");
      return;
    }

    const data = {
      [confName]: configuration,
    };
    onSubmit(data);
    onClose();
  };
  return (
    <div className="border border-border p-1">
      <h3 className="font-bold text-center my-2">Create New Configuration</h3>
      <div className="flex items-center  gap-4 my-3">
        <Label className="text-nowrap  w-52">Configuration Name:</Label>
        <Input onChange={(e) => setConfName(e.target.value)} type="text" />
      </div>
      <div className="flex items-center  gap-4 my-3">
        <Label className="text-nowrap  w-52">Configuration type:</Label>
        <Select
          value={configuration.priceType} // Bind the current value to `widgetType`
          onValueChange={(val) =>
            setConfiguration((prev) => ({
              ...prev,
              priceType: val as "base" | "additional",
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Configuration price type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="base">Base</SelectItem>
            <SelectItem value="additional">Additional</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-2 text-sm flex flex-col gap-2">
        {configuration.availableOptions.map((option, index) => (
          <div className="capitalize " key={`${option}-${index}`}>
            {option}
          </div>
        ))}
      </div>
      <div className={` gap-2 flex`}>
        <Input
          value={optionInput}
          onChange={(e) => setOptionInput(e.target.value)}
          type="text"
          className="border p-2 w-1/3"
          placeholder="Add an option"
        />
        <Button type="button" onClick={addOption}>
          Add Option
        </Button>
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <Button
          type="button"
          onClick={handleCancel}
          className=" text-background bg-foreground  w-1/4"
        >
          Cancel
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Create Configuration
        </Button>
      </div>
    </div>
  );
};
