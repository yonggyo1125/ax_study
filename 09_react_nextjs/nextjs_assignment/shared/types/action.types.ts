export interface ActionState<T = unknown> {
    success: boolean;
    message?: string;
    errors?: Record<string, string>;
    data?: T;
}

export const INITIAL_ACTION_STATE: ActionState = {
    success: false,
};
