const getRandomNumber = (maxNum) => {
  return Math.floor(Math.random() * maxNum);
};

const getRandomColor = () => {
  const rgb = [
    getRandomNumber(256),
    getRandomNumber(256),
    getRandomNumber(256),
  ];
  if (!rgb.every((numbers) => numbers > 190)) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  } else return getRandomColor();
};

export { getRandomColor };
