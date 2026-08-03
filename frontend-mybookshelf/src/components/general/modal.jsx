export default function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative'
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl'
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}