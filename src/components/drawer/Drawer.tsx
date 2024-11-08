interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed z-50 left-0 top-0 w-screen h-screen bg-card-foreground"
        >
          <div
            className="bg-card w-1/2 h-screen ml-auto overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
