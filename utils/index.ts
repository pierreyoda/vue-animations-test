export const browserRequireJson = async (filename: string): Promise<any> => {
  if (!process.browser) {
    return {};
  }
  const jsonModule = await import(`~/assets/${filename}`);
  return jsonModule.default;
};
