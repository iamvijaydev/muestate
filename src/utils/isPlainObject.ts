export const isPlainObject = <StateType>(obj: unknown): obj is Partial<StateType> => {
	return (
		obj !== null &&
		typeof obj === 'object' &&
		[null, Object.prototype].includes(Object.getPrototypeOf(obj))
	);
}