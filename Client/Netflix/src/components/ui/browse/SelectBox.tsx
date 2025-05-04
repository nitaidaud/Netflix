import { Categories } from "@/components/browse/categories/browseCategories";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categoriesValues = [
  // { value: Categories.Top, label: "Top" },
  { value: Categories.Action, label: "Action" },
  { value: Categories.Animation, label: "Animation" },
  { value: Categories.Comedy, label: "Comedy" },
  { value: Categories.Crime, label: "Crime" },
  { value: Categories.Documentary, label: "Documentary" },
  { value: Categories.Horror, label: "Horror" },
  { value: Categories.Kids, label: "Kids" },
  { value: Categories.Romance, label: "Romance" },
];

type SelectDemoProps = {
  onChange: (value: string) => void;
  selectedValue?: string;
};

const SelectBox = ({ onChange, selectedValue }: SelectDemoProps) => {
  return (
    <Select onValueChange={onChange} value={selectedValue ?? ""}>
      <SelectTrigger className="border-2 border-gray-300 h-full rounded-none w-[150px] text-white">
        <SelectValue placeholder="Select"/>
      </SelectTrigger>
      <SelectContent className="bg-zinc-900">
        <SelectGroup className="bg-zinc-900">
          {categoriesValues.map((category) => (
            <SelectItem key={category.value} value={category.label}>
              {category.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
