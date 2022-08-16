import { useDrag } from "react-dnd";

interface ILabel {
  text: string | null;
}

interface dropResult {
  name: string;
}
function Label({ text }: ILabel) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "label",
    item: { text },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<dropResult>();
      if (item && dropResult) {
        alert(`You dropped ${item.text} into ${dropResult.name}`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <li ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {text}
    </li>
  );
}

export default Label;
