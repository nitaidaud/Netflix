import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  interface Props {
    selected?: number;
    totalSeasons: number;
    onSelect?: (season: number) => void;
  }
  
  const SeasonSelect = ({ selected = 1, totalSeasons, onSelect }: Props) => {
    const handleChange = (value: string) => {
      const season = parseInt(value);
      onSelect?.(season);
    };
  
    return (
      <Select value={selected.toString()} onValueChange={handleChange}>
        <SelectTrigger className="border border-white bg-black/50 text-white rounded-none w-[140px] h-8 px-3 text-sm">
          <SelectValue placeholder="Season" />
        </SelectTrigger>
  
        <SelectContent className="bg-black/80 border border-zinc-700 text-white">
          <SelectGroup>
            {Array.from({ length: totalSeasons }, (_, i) => (
              <SelectItem
                key={i + 1}
                value={(i + 1).toString()}
                className="hover:bg-zinc-700"
              >
                Season {i + 1}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };
  
  export default SeasonSelect;
  