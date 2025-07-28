import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface DeletePopupProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function DeletePopup({ onConfirm, onCancel }: DeletePopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm?.();
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button 
          type="button" 
          className="p-2 rounded hover:bg-red-100 transition" 
          title="Jd"
        >
          <img src="/images/trash.svg" alt="Jd" width="32" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-600 text-center">
            削除してもよろしいですか？
          </DialogTitle>
        </DialogHeader>



        <div className="flex justify-center w-full gap-2">
        <DialogFooter className="flex gap-2">
        <Button
            variant="outline"
            className="w-1/2 rounded-full"
            onClick={handleCancel}
          >
            キャンセル
          </Button>
          <Button
            variant="outline"
            className="w-1/2 rounded-full bg-red-500"
            onClick={handleConfirm}
          >
            削除する
          </Button>
        </DialogFooter>
        </div>

      </DialogContent>
    </Dialog>
  );
}