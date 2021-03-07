import * as React from "react";

// Returns the previous value of a variable (i.e. from the previous render)
export function usePrevious<T>(value: T, initialValue: T): T {
    const ref = React.useRef(initialValue);

    React.useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

/**
 * Tracks the progress of an async call.
 * TODO: queue repeated calls
 */
export function useAsyncFunction<ARGS_TYPE extends any[], RETURN_TYPE>(
    callable: (...args: ARGS_TYPE) => RETURN_TYPE,
) {
    const [isFetching, setIsFetching] = React.useState(false);
    const functionWrapper = async (...args: ARGS_TYPE) => {
        setIsFetching(true);
        try {
            const result = await callable(...args);
            setIsFetching(false);
            return result;
        } catch (e) {
            setIsFetching(false);
            throw e;
        }
    };
    return [functionWrapper, isFetching] as const;
}
