export default function Loading() {
  return (
    <div className="app-loader" role="status" aria-live="polite" aria-label="Loading Le Voyage">
      <span className="app-loader-tiles" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="app-loader-bar" aria-hidden="true" />
    </div>
  );
}
