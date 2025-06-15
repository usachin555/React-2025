export function Items({ items, onDeleteItem, MutateItem }) {
  function deleteItem() {
    window.alert(`deleting item ${items.description}`);
    onDeleteItem(items.id);
  }
  return (
    <li>
      <input
        type="checkbox"
        onClick={() => MutateItem(items.id)}
        value={items.packed}
      />
      <span style={items.packed ? { textDecoration: "line-through" } : {}}>
        {items.quantity} {items.description}
      </span>
      <button onClick={deleteItem}>❌</button>
    </li>
  );
}
