import React, { useState } from 'react';
import { ChevronRight, X, ChevronLeft, Plus } from 'react-feather';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addBoard, setActiveBoard, updateBoard, deleteBoard ,copyBoard} from '../../store/boardSlice';

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [boardColor, setBoardColor] = useState('');
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [optionsVisible, setOptionsVisible] = useState(null); // State for options menu
  const dispatch = useDispatch();
  const boards = useSelector(state => state.boardSlice.boards);
  const activeBoardId = useSelector(state => state.boardSlice.activeBoardId);

  const handleBoardClick = (boardId) => {
    dispatch(setActiveBoard(boardId));
  };

  const handleUpdateBoardModal = (board) => {
    setSelectedBoard(board.id === selectedBoard ? null : board.id);
    setBoardName(board.name);
    setBoardColor(board.color);
    setOptionsVisible(null); // Close the options menu
  };

  const handleUpdateBoard = (e, boardId) => {
    e.preventDefault();
    dispatch(updateBoard({ boardId: boardId, name: boardName, color: boardColor }));
    setSelectedBoard(null);
  };

  const handleCreateBoard = (e) => {
    e.preventDefault();
    dispatch(addBoard({
      id: uuidv4(),
      name: boardName,
      color: boardColor,
    }));
    setBoardName('');
    setBoardColor('');
    setShowPop(false);
  };

  const handleDeleteBoard = (boardId) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      dispatch(deleteBoard(boardId));
      setOptionsVisible(null); 
    }
  };
const handleCopyBoard = (board) => {
  
  dispatch(copyBoard({boardId: board.id}));
  setOptionsVisible(null);

}
  return (
    <div className={`bg-[#1d2125] h-[92vh] text-gray-200 transition-all linear duration-500 flex-shrink-0 ${collapsed ? 'w-[42px]' : 'w-[280px]'}`}>
      {collapsed && (
        <div className='p-2'>
          <button onClick={() => setCollapsed(!collapsed)} className='hover:bg-zinc-700 rounded-sm p-1'>
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {!collapsed && (
        <div>
          <div className='p-3 hover:cursor-pointer flex justify-between border-b border-b-[#3a4149]'>
            <h4>My Workspace</h4>
            <button onClick={() => setCollapsed(!collapsed)} className='hover:bg-zinc-700 rounded-sm p-1'>
              <ChevronLeft size={18} />
            </button>
          </div>

          <div className="boardList">
            <div className="flex justify-between p-3">
              <h6>Your Boards</h6>
              <button onClick={() => setShowPop(!showPop)} className={`${!showPop ? '' : 'hover:bg-slate-300'} rounded-sm p-1`}>
                {!showPop && <Plus className='hover:bg-zinc-700' size={18} />}
              </button>

              {showPop && (
                <form onSubmit={handleCreateBoard} className='p-3'>
                  <div className='mb-2'>
                    <label htmlFor='boardName' className='block text-sm font-medium text-gray-700'>Board Name</label>
                    <input
                      type='text'
                      id='boardName'
                      value={boardName}
                      onChange={(e) => setBoardName(e.target.value)}
                      className='mt-1 block w-full p-2 bg-zinc-700 text-gray-300 rounded-md'
                      required
                    />
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='boardColor' className='block text-sm font-medium text-gray-700'>Board Color</label>
                    <input
                      type='color'
                      id='boardColor'
                      value={boardColor}
                      onChange={(e) => setBoardColor(e.target.value)}
                      className='mt-1 bg-zinc-700 text-gray-300 h-10 block w-full p-2 rounded-md'
                      required
                    />
                  </div>
                  <button onClick={() => setShowPop(!showPop)} className='mt-2 p-2 hover:bg-zinc-700 rounded-md'>Cancel</button>
                  <button type='submit' className='mt-2 p-2 bg-blue-500 text-white rounded-md'>Save</button>
                </form>
              )}
            </div>
          </div>

          {boards.map((board) => (
            <ul key={board.id}>
              <li className='hover:bg-zinc-700'>
                <button onClick={() => handleBoardClick(board.id)}
                  className='px-3 py-2 w-full text-sm flex justify-start'>
                  <span className='w-6 h-max rounded-sm mr-2' style={{ backgroundColor: board.color }}>&nbsp;</span>
                  <div className="flex w-full items-center justify-between">
                    <span>{board.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOptionsVisible(board.id === optionsVisible ? null : board.id);
                      }}
                      title="Edit Board"
                      className="text-gray-300 m-0 mt-[-5px] p-0 text-lg float-right font-extrabold"
                    >
                      ...
                    </button>
                  </div>
                </button>

                {optionsVisible === board.id && (
                  <div className="options-menu p-2 bg-zinc-800 rounded-md shadow-md">
                    <button onClick={() => handleUpdateBoardModal(board)} className="block w-full text-left p-1 text-sm text-gray-300 hover:bg-zinc-700 rounded-md">Update Board</button>
                    <button onClick={() => handleCopyBoard(board)} className="block w-full text-left p-1 text-sm text-gray-300 hover:bg-zinc-700 rounded-md">Copy Board</button>
                    
                    <button onClick={() => handleDeleteBoard(board.id)} className="block w-full text-left p-1 text-sm text-red-500 hover:bg-zinc-700 rounded-md">Delete Board</button>
                  </div>
                )}

                {selectedBoard === board.id && (
                  <form onSubmit={(e) => handleUpdateBoard(e, board.id)}
                    className='p-3 hover:bg-zinc-800'>
                    <div className='mb-2'>
                      <label htmlFor={`boardName-${board.id}`} className='block text-sm font-medium text-gray-500 p-1'>Board Name</label>
                      <input
                        type='text'
                        id={`boardName-${board.id}`}
                        value={boardName}
                        onChange={(e) => setBoardName(e.target.value)}
                        className='mt-1 block w-full p-2 bg-zinc-700 text-gray-200 rounded-md'
                        required
                      />
                    </div>
                    <div className='mb-2'>
                      <label htmlFor={`boardColor-${board.id}`} className='block text-sm font-medium text-gray-500 p-1'>Board Color</label>
                      <input
                        type='color'
                        id={`boardColor-${board.id}`}
                        value={boardColor}
                        onChange={(e) => setBoardColor(e.target.value)}
                        className='mt-1 bg-zinc-700 text-gray-300 h-10 block w-full p-2 rounded-md'
                        required
                      />
                    </div>
                    <button type='button' onClick={() => setSelectedBoard(null)} className='mt-2 p-2 hover:bg-zinc-700 rounded-md'>Cancel</button>
                    <button type='submit' className='mt-2 p-2 bg-blue-500 text-white rounded-md'>Update</button>
                  </form>
                )}
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBar;
