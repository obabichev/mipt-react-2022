export const unflatten = (tags) => {
  const hashTable = Object.create(null);

  tags.forEach(
    (tag) =>
      (hashTable[tag.key] = {
        ...tag,
        value: tag.key,
        title: tag.title,
        children: [],
      })
  );

  const tagsTree = [];

  tags.forEach((tag) => {
    if (tag.parent) {
      hashTable[tag.parent].children.push(hashTable[tag.key]);
    } else {
      tagsTree.push(hashTable[tag.key]);
    }
  });

  return tagsTree;
};
