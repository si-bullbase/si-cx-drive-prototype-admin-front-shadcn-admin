
interface ImagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  altText: string;
}

export function ImagePopup({ isOpen, onClose, imageSrc, altText }: ImagePopupProps) {
  if (!isOpen) return null;
  // 3秒後に自動で閉じる
  setTimeout(() => {
    onClose();
  }, 3000);

  return (
    <div 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className="fixed inset-0 bg-black bg-opacity-1 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative max-w-md max-h-[80vh]">
        <img 
          src={imageSrc} 
          alt={altText}
          className="max-w-full max-h-full object-contain cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
}