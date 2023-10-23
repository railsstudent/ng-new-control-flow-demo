export const toPage = (value: string, fallbackValue: number) => {
    try {
      if (!value) {
        return fallbackValue;
      }
      return parseInt(value, 10);
    }  catch {
      return fallbackValue;
    }   
}
