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
          className="fixed z-50 left-0 top-0 w-screen h-screen bg-black/75"
        >
          <div
            className="bg-gray-100 w-1/2 h-screen ml-auto"
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
