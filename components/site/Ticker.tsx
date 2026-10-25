import { site } from "@/data/site";

export function Ticker() {
  const group = () => (
    <div className="ticker__group" aria-hidden="true">
      {site.ticker.map((item) => (
        <span className="ticker__item" key={item}>
          {item}
          <span className="ticker__star" aria-hidden="true">
            ✳
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {group()}
        {group()}
        {group()}
      </div>
    </div>
  );
}
