import ReactModal from "react-modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const Confirm = ({ isOpen, onClose, onConfirm }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl max-w-md mx-auto mt-40 border border-white/20 text-white"
      overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center"
    >
      <h2 className="text-xl font-bold mb-4">Confirm Action</h2>

      <p className="text-white/70 mb-6">
        Are you sure you want to change your avatar?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600"
        >
          Confirm
        </button>
      </div>
    </ReactModal>
  );
};