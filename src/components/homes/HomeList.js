import Home from "./Home";

export default function HomeList({homes}) {

  return (
    <div className="mt-4 mb-8">
      {homes.map((h) => (
        <Home key={h.id} home={h} />
      ))}
    </div>
  );
}
