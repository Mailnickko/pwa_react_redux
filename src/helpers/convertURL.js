export const convertUrl = (str) => {
  const ssl = 'https';
  if (str.slice(0,5) !== ssl) {
    return ssl + str.slice(4);
  }
  return str;
}
