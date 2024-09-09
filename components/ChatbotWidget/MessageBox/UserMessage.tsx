import { useState } from 'react';
import { Message } from '../types';
import { useChatContext } from '@/contexts/ChatContext';
import { Check, Edit2, Trash2 } from 'lucide-react';

type Props = {
  message: Message;
};

export default function UserMessage({ message }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.text);
  const { updateMessage, deleteMessage } = useChatContext();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editedText !== message.text) {
      await updateMessage(message.id, editedText);
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      await deleteMessage(message.id);
    }
  };

  return (
    <div className="ml-auto w-max bg-violet-600 px-3 py-2.5 rounded-l-2xl rounded-b-2xl border border-violet-500 text-white text-xs font-semibold relative group">
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="bg-transparent outline-none resize-none w-full"
          autoFocus
        />
      ) : (
        message.text
      )}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex">
        {isEditing ? (
          <button onClick={handleSave} className="bg-green-500 p-1 rounded-full text-white mr-1">
            <Check size={16} />
          </button>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="bg-gray-200 p-1 rounded-full text-gray-600 mr-1"
            >
              <Edit2 size={16} />
            </button>
            <button onClick={handleDelete} className="bg-red-500 p-1 rounded-full text-white">
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
