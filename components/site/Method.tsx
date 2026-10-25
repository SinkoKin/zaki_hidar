import { site } from "@/data/site";

export function Method() {
  return (
    <section className="method section" id="method" aria-labelledby="method-title">
      <div className="container method__grid">
        <div className="method__intro" data-reveal>
          <p className="eyebrow">{site.method.eyebrow}</p>
          <h2 id="method-title">{site.method.heading}</h2>
          <p className="method__lede">{site.method.intro}</p>

          <div className="method__diagram" aria-hidden="true">
            <span className="method__diagram-ring" />
            <span className="method__diagram-ring method__diagram-ring--inner" />
            <span className="method__diagram-axis" />
            <span className="method__diagram-dot" />
          </div>

          <p className="method__note">
            <span className="mono steel">Coach note</span>
            {site.method.note}
          </p>
        </div>

        <div className="method__log" data-reveal>
          <div className="method__log-head mono" aria-hidden="true">
            <span>Layer</span>
            <span>Focus</span>
            <span>Output</span>
          </div>

          {site.method.steps.map((step) => (
            <article className="method__step" key={step.number}>
              <span className="method__step-number mono">{step.number}</span>
              <div className="method__step-copy">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
              <span className="tag method__tag">{step.tag}</span>
            </article>
          ))}

          <div className="method__log-foot mono">
            <span>End of layer sequence</span>
            <span>Repeat / refine / progress</span>
          </div>
        </div>
      </div>
    </section>
  );
}
