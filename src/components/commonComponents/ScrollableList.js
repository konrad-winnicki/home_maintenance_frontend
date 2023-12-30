export const ScrollableList = ({ children }) => {
  return (
    <div
      className="flex-grow-1 mt-1 mb-8"
      flex-grow-1
      style={{
        overflow: "auto",
        paddingBottom: "1%",
        marginBottom: "1%",
      }}
    >
      {children}
    </div>
  );
};
