function NotFoundPage() {
  return (
    <div className="not-found_container">
      <div className="container">
        <div className="row">
          <div
            className="col col-12"
            style={{
              height: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: "700",
              color: "var(--body_color)",
            }}
          >
            404 - NOT FOUND
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
