interface Props {
  children: React.ReactNode;
}

const ModalOverlay: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-500 opacity-50"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        {children}
      </div>
    </>
  );
};

export default ModalOverlay;
