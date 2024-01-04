export const BottomNavBar = ({ children }) => {
  return (
    <div className="mr-0 ml-0 pt-3 pb-3 pr-0 pl-0 d-flex 
        justify-content-between sticky-bottom"
        style={{backgroundColor: '#f6bd60'}}>
         {children}
        </div>
  );
};
