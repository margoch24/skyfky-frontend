export const debounce = async <T>(
  promise: Promise<T>,
  minDelay: number
): Promise<T> => {
  const startTime = new Date().getTime();
  const response = await promise;
  const endTime = new Date().getTime();

  const difference = minDelay - (endTime - startTime);
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(response);
      },
      difference > 0 ? difference : 1
    );
  });
};
