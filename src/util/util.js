function utilSort(target) {
  target.sort((a, b) => {
    if (a.key < b.key) {
      return 1;
    }
    if (a.key > b.key) {
      return -1;
    }
    return 0;
  });
  return target;
}

export { utilSort };
