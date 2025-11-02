import { useEffect } from "react";

export function useKey(Key, closeMoveee) {
  useEffect(() => {
    function callBack(e) {
      if (e.code.toLowerCase() === Key.toLowerCase()) {
        closeMoveee();
      }
    }

    document.addEventListener("keydown", callBack);

    return () => {
      document.removeEventListener("keydown", callBack);
    };
  }, [Key, closeMoveee]);
}
