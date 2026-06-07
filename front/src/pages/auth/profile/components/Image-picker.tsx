import { useRef } from "react";

type Props = {
  onSelect: (file: File, preview: string) => void;
};

export const ImagePicker = ({ onSelect }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    onSelect(file, preview);
  };

  return (
    <div>
      {/* hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {/* button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
      >
        Change Photo
      </button>
    </div>
  );
};