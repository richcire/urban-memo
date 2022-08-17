import { useDrag, useDrop } from "react-dnd";
import { useRecoilState } from "recoil";
import { recoilStorage } from "../atom";
import update from "immutability-helper";
import { useCallback, useRef } from "react";

interface ILabel {
  text: string | null;
  index: number;
}

interface dropResult {
  name: string;
}

interface IDragItem {
  text: string;
  index: number;
}
function Label({ text, index }: ILabel) {
  const ref = useRef<HTMLLIElement>(null);
  const [storage, setStorage] = useRecoilState(recoilStorage);

  const moveLabel = (dragIndex: number, hoverIndex: number) => {
    console.log(dragIndex, hoverIndex);
    const targetBoard = [...storage.todo];
    const extractedLabel = targetBoard.splice(dragIndex, 1);
    console.log(extractedLabel);
    targetBoard.splice(hoverIndex, 0, ...extractedLabel);
    setStorage((prev) => ({
      ...prev,
      todo: targetBoard,
    }));
  };

  const [_, drop] = useDrop({
    accept: "label",
    hover(item: IDragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingReact = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingReact.bottom - hoverBoundingReact.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset?.y! - hoverBoundingReact.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveLabel(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "label",
    item: { text, index },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(drop(ref));

  return (
    <li ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {text}
    </li>
  );
}

export default Label;
