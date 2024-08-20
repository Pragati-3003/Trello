import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { updateCard, deleteCard, copyCard } from '../../store/boardSlice';

const Card = ({ cardInfo, index }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [name, setName] = useState(cardInfo.name);
  const [description, setDescription] = useState(cardInfo.description || '');
  
  const dispatch = useDispatch();

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
    setIsOptionsOpen(false); // Close options menu if it's open
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSave = () => {
    dispatch(updateCard({ 
      cardId: cardInfo.id, 
      listId: cardInfo.listId,
      name, 
      description 
    }));
    handleDialogClose();
  };

  const handleOptionsToggle = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleDeleteCard = () => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      dispatch(deleteCard({ cardId: cardInfo.id, listId: cardInfo.listId }));
    
    }
    setIsOptionsOpen(false);
  };

  const handleCopyCard = () => {
    dispatch(copyCard({ cardId: cardInfo.id, listId: cardInfo.listId }));
    setIsOptionsOpen(false);
  };

  return (
    <Draggable draggableId={cardInfo.id} index={index}>
      {(provided) => (
        <div
          className='text-gray-300 z-10 bg-zinc-700 hover:bg-gray-500 p-2 mt-2 shadow-md rounded-md'
          ref={provided.innerRef}
          style={{ backgroundColor: '#222', ...provided.draggableProps.style }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className='flex justify-between items-center'>
            <button onClick={handleDialogOpen} className='text-left'>
              {cardInfo.name}
            </button>
            <button 
              onClick={handleOptionsToggle}
              title="Card Options"
              className="text-gray-300 h-7 w-7 mt-[-10px] font-extrabold"
            >
              ...
            </button>
       
          </div>
          {isOptionsOpen && (
              <div className="relative  mt-2 bg-zinc-800 text-white p-2 rounded-md shadow-lg">
                <button
                  onClick={handleCopyCard}
                  className="block w-full text-left p-2 hover:bg-zinc-600"
                >
                  Copy Card
                </button>
                <button
                  onClick={handleDeleteCard}
                  className="block w-full text-left p-2 hover:bg-zinc-600 text-red-500"
                >
                  Delete Card
                </button>
                <button
                  onClick={handleDialogOpen}
                  className="block w-full text-left p-2 hover:bg-zinc-600"
                >
                  Update Card
                </button>
              </div>
            )}
          {isDialogOpen && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-15 z-50'>
              <div className='bg-zinc-800 text-gray-300 p-4 rounded shadow-md max-w-md w-full'>
                <h2 className='text-lg font-bold mb-2'>Edit Card</h2>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='bg-zinc-700 hover:bg-zinc-500 hover:font-bold hover:text-black p-2 rounded w-full mb-2'
                  placeholder='Card Name'
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='bg-zinc-700 hover:bg-zinc-500 hover:font-bold hover:text-black p-2 rounded w-full mb-2'
                  placeholder='Card Description'
                  rows="4"
                />
                <div className='flex justify-end'>
                  <button
                    onClick={handleDialogClose}
                    className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
