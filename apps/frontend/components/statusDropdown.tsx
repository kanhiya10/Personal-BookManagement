type Status = "Read" | "Reading" | "Completed";

type Props = {
  value: Status;
  onChange: (status: Status) => void;
};

export default function StatusDropdown({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Status)}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
    >
      <option value="Read">Read</option>
      <option value="Reading">Reading</option>
      <option value="Completed">Completed</option>
    </select>
  );
}