import * as React from 'react';

const Tags = ({ tagsTree, parent = null, level = 0 }) => {
  const tags = tagsTree
    .filter((item) => item.parent === parent)
    .sort((a, b) => (a.text > b.text ? 1 : -1));

  if (!tags.length) {
    return null;
  }

  return (
    <>
      {tags.map(({ key, title }) => (
        <div key={key} style={{ paddingLeft: '10px' }}>
          {title}
          <Tags tagsTree={tagsTree} parent={key} level={level + 1} />
        </div>
      ))}
    </>
  );
};

export default Tags;
