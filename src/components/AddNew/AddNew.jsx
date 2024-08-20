import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'react-feather';
import { addList, addCard } from '../../store/boardSlice'
const AddNew = ({ type, parentId }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const forminput = useRef(null);
  const activeBoardId = useSelector(state => state.boardSlice.activeBoardId);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!inputValue) {
      forminput.current.focus();
      return;
    }
    if (type) {
      // console.log(parentId);
      // console.log(activeBoardId);
      dispatch(addCard({ id: uuidv4(), boardId: activeBoardId, name: inputValue, listId: parentId }))

    } else
      dispatch(addList({ id: uuidv4(), boardId: activeBoardId, name: inputValue }))
    setInputValue("");
    setIsFormVisible(!isFormVisible)
  }
  return (
    <div>
      <button className='flex ' onClick={() => setIsFormVisible(!isFormVisible)}>   <Plus className='mt-1 mr-2' size={16}></Plus>  Add {type ? " a card" : "another list"} </button>
      {isFormVisible &&
        <form onSubmit={submitHandler} className='mt-3'>
          <input

            value={inputValue}
            ref={forminput}
            onChange={(e) => setInputValue(e.target.value)}
            className='w-full h-10 mb-1 bg-zinc-700 text-gray-200 border-zinc-900 p-2 shadow-sm' 
            type="text" placeholder={`Add new ${type ? "card" : "list"}`} />
          <div className="mt-3">
            <button type="button" onClick={() => setIsFormVisible(!isFormVisible)} className="mr-3 ">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 bg-blue-500 text-white">
              Save
            </button>
          </div>
        </form>
      }
    </div>
  )
}

export default AddNew