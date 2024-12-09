import { Button, Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
    abortText?: string;
}

const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    description = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    abortText = 'Cancel',
}) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {title}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {description}
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-end space-x-2">
                                    <Button variant="outline" onClick={onClose}>
                                        {abortText}
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={handleConfirm}
                                    >
                                        {confirmText}
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

// Utility hook to manage confirm dialog state
export const useConfirmDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(
        null,
    );
    const [dialogProps, setDialogProps] = useState<Partial<ConfirmDialogProps>>(
        {},
    );

    const confirm = (options: {
        onConfirm: () => void;
        title?: string;
        description?: string;
        confirmText?: string;
        abortText?: string;
    }) => {
        setConfirmAction(() => options.onConfirm);
        setDialogProps({
            title: options.title,
            description: options.description,
            confirmText: options.confirmText,
            abortText: options.abortText,
        });
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleConfirm = () => {
        confirmAction?.();
        handleClose();
    };

    return {
        ConfirmDialog: (
            <ConfirmDialog
                isOpen={isOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
                {...dialogProps}
            />
        ),
        confirm,
    };
};

export default ConfirmDialog;
