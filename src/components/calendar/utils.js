const createChunks = (array, chunkSize) => {
  const newArray = [];
  for (let i = 0, j = array.length; i < j; i += chunkSize) {
    const arrayChunk = array.slice(i, i + chunkSize);
    newArray.push(arrayChunk);
  }
  return newArray;
};

export { createChunks };
