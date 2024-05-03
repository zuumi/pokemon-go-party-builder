import { useDrag } from "react-dnd";

export default function PokemonImage({image}) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "image",
      item: { id: image },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    })
  );
  return (
    <div>
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
          <img
            className="text-black h-[100px] w-[100px] mx-4 flex items-center justify-center shadow-md"
            src="{image}"
            alt="Pokemon" />
      </div>
    </div>
  );
}