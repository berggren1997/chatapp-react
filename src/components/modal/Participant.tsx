interface Props {
  participant: string;
  createConversation: () => void;
}
const Participant: React.FC<Props> = ({ participant, createConversation }) => {
  return (
    <div className="mt-2 mb-4 w-full flex justify-between items-center p-2">
      <p className="text-sm">{participant}</p>
      <button
        className="bg-[#0000FF] text-xs rounded-md p-2"
        onClick={createConversation}
      >
        Create conversation
      </button>
    </div>
  );
};

export default Participant;
