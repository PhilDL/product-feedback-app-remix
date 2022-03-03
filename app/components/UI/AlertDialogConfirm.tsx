import { AlertDialogContent, AlertDialogDescription, AlertDialogLabel, AlertDialogOverlay } from '@reach/alert-dialog';
import React, { useRef } from 'react';
import { Button, Card } from '~/components/UI';

type AlertDialogConfirmProps = {
  className?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  cancelText?: string;
  onDismiss: () => void;
};

const AlertDialogConfirm: React.FC<AlertDialogConfirmProps> = ({
  className,
  title,
  description,
  children,
  onDismiss,
  cancelText = "Cancel",
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null!);
  return (
    <AlertDialogOverlay
      className="fixed bg-blue-dark/50 top-0 right-0 bottom-0 left-0 flex items-center justify-center"
      onClick={onDismiss}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogContent className={`${className} w-full max-w-xl `}>
        <Card className="flex-col gap-9">
          <AlertDialogLabel>
            <h2 className="font-bold text-xl text-gray-700">{title}</h2>
          </AlertDialogLabel>

          {description && (
            <AlertDialogDescription>
              <p className="font-normal text-gray-500">{description}</p>
            </AlertDialogDescription>
          )}

          <div className="flex w-full justify-between">
            {children}
            <Button role="default" ref={cancelRef} onClick={onDismiss}>
              {cancelText}
            </Button>
          </div>
        </Card>
      </AlertDialogContent>
    </AlertDialogOverlay>
  );
};
export default AlertDialogConfirm;
