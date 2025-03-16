export default function Signal({ color, isActive }) {
  return (
    <div
      style={{ backgroundColor: `${isActive ? color : "grey"}` }}
      className="signal"
    ></div>
  );
}
