import { Rule } from '@/types/Rules';

export default function Selector({
  value,
  onHandleChange,
  options,
  label,
}: Readonly<{
  value?: string;
  options: Rule[];
  onHandleChange: React.Dispatch<React.SetStateAction<string>>;
  label: string;
}>) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onHandleChange(e.target.value)}
        className="w-full px-3 py-2 border rounded bg-white text-black"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
}
