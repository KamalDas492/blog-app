import React, { useState } from 'react';

const ImageInput = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isElementVisible, setElementVisible] = useState(true);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setBackgroundImage(reader.result);
    };

    reader.readAsDataURL(file);
    setElementVisible(false);
    document.getElementById("square-area").style.border = "none";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      id="square-area"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
     {isElementVisible &&  <p className = "dragAndDrop">Drag and drop an image here</p>}
    </div>
  );
};

export default ImageInput;
