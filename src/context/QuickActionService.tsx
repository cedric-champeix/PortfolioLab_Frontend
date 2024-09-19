import React, {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';

interface QuickActionContextProps {
  quickActions: any;
  dispatch: Dispatch<ActionProps>;
}

export const QuickActionContext = createContext<QuickActionContextProps>(null!);

interface QuickActionProviderProps {
  children: ReactNode;
}

interface ActionProps {
  actionName: string;
  type: 'MOUNT_ACTION' | 'UNMOUNT_ACTION';
}

export const QuickActionProvider: React.FunctionComponent<
  Readonly<QuickActionProviderProps>
> = ({ children }) => {
  const quickActionReducer = (state: any, action: ActionProps) => {
    switch (action.type) {
      case 'MOUNT_ACTION':
        return [...state, action.actionName];
      case 'UNMOUNT_ACTION':
        return state.filter((item: any) => item !== action.actionName);
    }
  };

  const [quickActions, dispatch] = useReducer(quickActionReducer, []);

  useEffect(() => {
    console.log('Internal state', quickActions);
  }, [quickActions]);

  return (
    <QuickActionContext.Provider value={{ quickActions, dispatch }}>
      {children}
    </QuickActionContext.Provider>
  );
};
