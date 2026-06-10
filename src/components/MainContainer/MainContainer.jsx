const MainContainer = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-evenly">
      {children}
    </div>
  );
};

export default MainContainer;
