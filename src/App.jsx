import { useState } from "react";
import { PackingList } from "./PackingList";
import { Logo } from "./Logo";
import { Stats } from "./Stats";
import { Form } from "./Form";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function onDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function ModifyItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function clearItems() {
    setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleRemoveItem={onDeleteItem}
        ModifyItems={ModifyItem}
        ClearItems={clearItems}
      />
      <Stats items={items} />
    </div>
  );
}
