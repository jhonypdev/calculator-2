import React from "react";
import { IoMdClose } from "react-icons/io";

interface List {
  value: string;
  label: string;
}

interface InfosProps {
  lists: List[];
  onClose: () => void;
}

const Infos: React.FC<InfosProps> = ({ lists, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-96">
        <button
          className="absolute text-lg top-2 right-3 text-gray-500 px-2 py-2"
          onClick={onClose}
          data-testid="close-modal-button"
        >
          <IoMdClose />
        </button>
        <h3 className="text-lg font-bold mb-4">Combinações Disponíveis</h3>
        <ul className="max-h-64 overflow-y-auto">
          {lists.map((item) => (
            <li key={item.value} className="bg-gray-100 p-2 mb-2 rounded">
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Infos;
