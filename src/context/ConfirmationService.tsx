import { createContext, ReactNode, useRef, useState } from 'react';
import { ConfirmationDialog } from '../components/ConfirmationDialog.tsx';

//Implementation : https://dev.to/dmtrkovalenko/the-neatest-way-to-handle-alert-dialogs-in-react-1aoe

interface ConfirmationOptions {
  catchOnCancel?: boolean;
  name: string;
}

/**
 * Confirmation service context
 * Quite complex, so I will try to explain everything.
 * This service was originally created with Typescript, so there can be some warnings
 * First we create a confirmation context. It will store a promise (wrong initially)
 * @type {React.Context<Promise<never>>}
 */
export const ConfirmationServiceContext = createContext<
  (options: ConfirmationOptions) => Promise<void>
>(null!);

interface ConfirmationServiceProps {
  children: ReactNode;
}

/**
 * This is our provider for the context
 * @returns {JSX.Element}
 * @constructor
 */
export const ConfirmationServiceContextProvider = ({
  children,
}: ConfirmationServiceProps): ReactNode => {
  /*
   * These are the options to pass to the dialog.
   * As of now it is only designed as a safeguard for skills and experiences removal, but
   * it can be easily adapted
   * Options :
   * - CatchOnCancel : specifies if we need to throw something in case of cancel
   * - name : name to display
   */
  const [confirmationState, setConfirmationState] =
    useState<ConfirmationOptions | null>(null);

  const awaitPromiseRef = useRef<{
    resolve: () => void;
    reject: () => void;
  }>();

  /**
   * Responsible for opening the dialog by passing options to the state
   *
   * @param options
   * @returns {Promise<unknown>}
   */
  const openConfirmation = (options: ConfirmationOptions): Promise<void> => {
    //Adding the options to confirm
    setConfirmationState(options);
    return new Promise((resolve, reject) => {
      awaitPromiseRef.current = { resolve, reject };
    });
  };

  /**
   * Responsible for closing the dialog by setting the options to null
   */
  const handleClose = () => {
    if (confirmationState?.catchOnCancel && awaitPromiseRef.current) {
      awaitPromiseRef.current.reject();
    }
    setConfirmationState(null);
  };

  /**
   * Responsible for submitting action.
   * Sets the options to null
   */
  const handleSubmit = () => {
    if (awaitPromiseRef.current) {
      awaitPromiseRef.current.resolve();
    }
    setConfirmationState(null);
  };

  return (
    <>
      <ConfirmationServiceContext.Provider value={openConfirmation}>
        {children}
      </ConfirmationServiceContext.Provider>
      <ConfirmationDialog
        open={Boolean(confirmationState)}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...confirmationState}
      ></ConfirmationDialog>
    </>
  );
};
