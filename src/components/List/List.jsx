import React, { useState } from 'react';
import AddNew from '../AddNew/AddNew';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import { v4 as uuidv4 } from 'uuid';
import { MoreHorizontal } from 'react-feather';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { deleteList, copyList, updateList } from '../../store/boardSlice';

const List = () => {
  const [showOptions, setShowOptions] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editingListId, setEditingListId] = useState(null);
  const [newListName, setNewListName] = useState('');
  const dispatch = useDispatch();

  const activeBoardId = useSelector(state => state.boardSlice.activeBoardId);
  const boards = useSelector(state => state.boardSlice.boards);
  const activeBoard = boards.find(board => board.id === activeBoardId);
  const boardLists = activeBoard ? activeBoard.lists : [];

  const handleCopyList = (listId) => {
    dispatch(copyList({ boardId: activeBoardId, listId }));
    setShowOptions(null);
  };

  const handleDeleteList = (listId) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      dispatch(deleteList({ boardId: activeBoardId, listId }));
      setShowDeleteConfirmation(false);
      setShowOptions(null);
    }
  };

 

  const handleEditListName = (listId, name) => {
    setEditingListId(listId);
    setNewListName(name);
  };

  const handleListNameChange = (e) => {
    setNewListName(e.target.value);
  };

  const handleListNameUpdate = (listId) => {
    dispatch(updateList({ boardId: activeBoardId, listId, name: newListName }));
    setEditingListId(null);
  };

  return (
    <div className='flex flex-grow'>
      {boardLists.map((list, index) => (
        <Draggable draggableId={list.id} index={index} key={list.id}>
          {(provided) => (
            <div
              className="p-3 w-[300px]"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className="rounded-lg p-3 text-gray-100 bg-black max-h-[80vh] overflow-y-auto">
                <div className="mb-4 font-medium flex justify-between items-center">
                  {editingListId === list.id ? (
                    <input
                      type="text"
                      value={newListName}
                      onChange={handleListNameChange}
                      onBlur={() => handleListNameUpdate(list.id)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleListNameUpdate(list.id);
                        }
                      }}
                      className="bg-gray-800 text-white p-1 rounded"
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => handleEditListName(list.id, list.name)}
                      className="cursor-pointer"
                    >
                      {list.name}
                    </span>
                  )}
                  <button
                    onClick={() => setShowOptions(showOptions === list.id ? null : list.id)}
                    title="List Options"
                    className="text-gray-300 text-lg rounded-md h-7 w-7 hover:bg-zinc-600"
                  >
                    <MoreHorizontal />
                  </button>
                </div>

                {showOptions === list.id && (
                  <div className="  bg-zinc-800 text-white p-2 rounded-md shadow-lg">
                    <button
                      onClick={() => handleCopyList(list.id)}
                      className="block w-full text-left p-2 hover:bg-zinc-600"
                    >
                      Copy List
                    </button>
                    <button
                      onClick={() => handleDeleteList(list.id)}
                      className="block w-full text-left p-2 hover:bg-zinc-600 text-red-500"
                    >
                      Delete List
                    </button>
                 
                  </div>
                )}

                <Droppable droppableId={list.id} type="card">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {list?.cards?.length > 0 &&
                        list.cards.map((card, cardIndex) => (
                          <Card key={card.id} cardInfo={{ ...card, listId: list.id }} index={cardIndex} />
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <div className="mt-3">
                  <AddNew type="card" parentId={list.id} />
                </div>
              </div>
            </div>
          )}
        </Draggable>
      ))}

      <div className='rounded-sm m-2 mt-4 w-[300px]'>
        <div className='p-3 bg-black text-gray-100 rounded-md'>
          <AddNew />
        </div>
      </div>
    </div>
  );
};

export default List;