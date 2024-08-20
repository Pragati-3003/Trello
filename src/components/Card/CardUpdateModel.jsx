import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { addCard } from '../../store/boardSlice';
const CardUpdateModel = ({ card, cardId, listId }) => {
  const activeBoardId = useSelector(state => state.boardSlice.activeBoardId);
 
  const [name, setName] = useState(card?.name || '');
  const [description, setDescription] = useState(card?.description || '');
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    e.stopPropagation();
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    e.stopPropagation();
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addCard(
      {
        activeBoardId,
        listId,
        cardId,
        name,
        description,
      }
    ),
    );
    // console.log(activeBoardId);
    
    // console.log("card description",description);
    // console.log("card name",name);
    
    
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <h2>Update Card</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            className='text-black'
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            className='text-black'
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default CardUpdateModel;