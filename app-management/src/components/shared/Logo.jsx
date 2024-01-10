import LogoSvg from "../../assets/bg-blacklogo.svg";

export default function Logo({ size }) {
  const height = size === "sm" ? "h-6" : "h-10";
  const fontSize = size === "sm" ? "text-xl" : "text-2xl";
  return (
    <div className="flex items-center gap-1">
      <img className={height} src={LogoSvg} alt="bg-blacklogo" />
      <h2 className={`${fontSize} font-bold mb-0.5`}>
        Chard(<span className="text-primary">s</span>);
      </h2>
    </div>
  );
}
