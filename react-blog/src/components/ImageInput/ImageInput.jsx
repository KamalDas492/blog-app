import React, { useState } from 'react';

const ImageInput = ({ onImageChange }) => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isElementVisible, setElementVisible] = useState(true);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImageFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    handleImageFile(file);
  };

  const handleImageFile = (file) => {
    setBackgroundImage(URL.createObjectURL(file));
    onImageChange(file); // Pass the File object to the parent component
    setElementVisible(false);
    document.getElementById('square-area').style.border = 'none';
  };

  return (
    <div
      id="square-area"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {isElementVisible && <label htmlFor="img_upload" className="dragAndDrop">Drag and drop or Select an image</label>}
      <input id="img_upload" type="file" onChange={handleInputChange} style={{ display: 'none' }} accept="image/*" />
    </div>
  );
};

export default ImageInput;
