import React, { useReducer, createContext, ReactNode, Dispatch } from "react";

export default function createDataContext<StateType, ActionType, ContextType>(
	reducer: (state: StateType, action: ActionType) => StateType,
	actions: {
		[key: string]: (dispatch: Dispatch<ActionType>) => (...args: any[]) => any;
	},
	initialState: StateType
) {
	const Context = createContext<ContextType | undefined>(undefined);

	const Provider = ({ children }: { children: ReactNode }) => {
		const [state, dispatch] = useReducer(reducer, initialState);

		const boundActions: Record<string, any> = {};
		for (const key in actions) {
			boundActions[key] = actions[key](dispatch);
		}

		const contextValue = {
			state,
			...boundActions,
		} as ContextType;

		return <Context.Provider value={contextValue}>{children}</Context.Provider>;
	};

	return { Context, Provider };
}
