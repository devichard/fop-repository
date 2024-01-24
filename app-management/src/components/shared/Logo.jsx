import LogoSvg from "../../assets/bg-blacklogo.svg";
import { useNavigate } from "react-router-dom";

export default function Logo({ size, justify }) {
  const height = size === "sm" ? "h-6" : "h-10";
  const fontSize = size === "sm" ? "text-xl" : "text-2xl";
  const navigate = useNavigate();

  let classes = "flex items-center gap-3";
  if (justify === "justify-center") classes += " justify-center"; 
  const navigateToHome = () => navigateToHome("/");

  return (
    <div
      className={classes}
      role="button"
      onClick={navigateToHome}
    >
      <img className={height} src={LogoSvg} alt="bg-blacklogo" />
      <h2 className={`${fontSize} font-bold mb-0.5`}>
        Chard(<span className="text-primary">s</span>);
      </h2>
    </div>
  );
}
