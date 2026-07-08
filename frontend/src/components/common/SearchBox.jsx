export default function SearchBox({
  value,

  onChange,

  placeholder = "Pesquisar...",
}) {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control w-100"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
