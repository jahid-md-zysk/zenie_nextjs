import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export interface Action {
  label: string;
  onClick: () => void;
  bgColor: string; // CSS class for background color
}

interface DialogProps {
  triggerLabel: string;
  title: string;
  description: string;
  actions: Action[];
  cancelLabel?: string;
  onCancel?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConfirmDialog: React.FC<DialogProps> = ({
  triggerLabel,
  title,
  description,
  actions,
  cancelLabel = 'Cancel',
  onCancel,
  open,
  onOpenChange,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" onClick={() => onOpenChange(true)}>{triggerLabel}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelLabel}</AlertDialogCancel>
          {actions.map((action, index) => (
            <AlertDialogAction
              key={index}
              className={action.bgColor}
              onClick={() => {
                action.onClick();
                onOpenChange(false);
              }}
            >
              {action.label}
            </AlertDialogAction>
          ))}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
