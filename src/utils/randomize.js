export function randomizeArr(originalArr) {
  const arr = [...originalArr];
  const randomArr = [];

  while (arr.length !== 0) {
    const randomIndex = Math.floor(Math.random() * arr.length);

    randomArr.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }

  return randomArr;
}
