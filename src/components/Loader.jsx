export const Loader = ({ label = "Loading" }) => {
    return (
        <div className="loader" role="status" aria-live="polite" aria-label={label}>
            <span className="loader__spinner" aria-hidden="true"></span>
            <span className="loader__label">{label}...</span>
        </div>
    );
};