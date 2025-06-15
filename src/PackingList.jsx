import { useState } from "react";
import { Items } from "./Items";

export function PackingList({
  items,
  handleRemoveItem,
  ModifyItems,
  ClearItems,
}) {
  const [sortBy, setSortBy] = useState("input");
  console.log(sortBy);
  console.log("items", items);

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  } else if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  // function ClearItems(){
  // }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((obj) => (
          <Items
            items={obj}
            key={obj.id}
            onDeleteItem={handleRemoveItem}
            MutateItem={ModifyItems}
          />
        ))}
      </ul>
      <div className="actionParent">
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Sort by input</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed</option>
          </select>
        </div>
        <div className="actions">
          <button onClick={ClearItems}>Clear</button>
        </div>
      </div>
    </div>
  );
}
