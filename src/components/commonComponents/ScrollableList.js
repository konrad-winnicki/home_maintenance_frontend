export const ScrollableList = ({ children }) => {
  return (
    <div

      className="flex-grow-1"
      style={{
        overflow: "auto",
        paddingTop: "3%",
        paddingBottom: "3%",
        marginBottom: "0%",
      }}
    >
      {children}
    </div>
  );
};
