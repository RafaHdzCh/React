export default function Stats({ items }) {
  const numberOfItems = items.length;

  if (!numberOfItems) return (
    <p className="stats">
      <em>
        Start Adding some items!
      </em>
    </p>
  );

  const numerOfPackedItems = items.filter(item => item.packed).length;
  const percentage = (numerOfPackedItems / numberOfItems) * 100;

  return (
    <footer className="stats">
      <em>
        {numerOfPackedItems === numberOfItems ?
          "You got everything! Ready to go!"
          :
          `You have ${numberOfItems} items on your list, and you already packed ${numerOfPackedItems}(${Math.round(percentage)}%)`}
      </em>
    </footer>
  );
}
