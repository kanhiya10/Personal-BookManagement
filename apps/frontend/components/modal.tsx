type Props = {
    children: React.ReactNode;
    onClose: () => void;
};

export default function BookModal({
    children,
    onClose,
}: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div
                className="
      relative
      w-full
      max-w-2xl
      max-h-[90vh]
      overflow-y-auto
      rounded-2xl
      bg-white
      p-6
    "
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-2xl"
                >
                    ×
                </button>

                {children}
            </div>
        </div>
    );
}