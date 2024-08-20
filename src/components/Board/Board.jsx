import React from 'react';
import List from '../List/List';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { reorderLists, reorderCards } from '../../store/boardSlice';
import Filter from "../Filter/Filter";
const Board = () => {
  const activeBoardId = useSelector(state => state.boardSlice.activeBoardId);
  const boards = useSelector(state => state.boardSlice.boards);
  const activeBoard = boards.find(board => board.id === activeBoardId);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (type === 'list') {
      // Handle reordering of lists within the board
      dispatch(reorderLists({ sourceIndex: source.index, destinationIndex: destination.index }));
    } else {
      // Handle reordering of cards within the list or between lists
      dispatch(reorderCards({ source, destination, draggableId }));
    }
  };

  if (!activeBoard) {
    return <div className='items-center text-gray-300 font-bold text-lg bg-zinc-700 w-full  flex align-middle  justify-center'> <h1> No active board</h1></div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <div
            style={{ backgroundColor: activeBoard.color || 'gray', scrollbarColor: '#4B5563 #1F2937' }}
            className='w-full  h-[92vh] flex flex-col p-5 overflow-auto'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Filter />
            <div className='w-full flex flex-wrap  flex-grow'>
              {activeBoard && <List />}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
