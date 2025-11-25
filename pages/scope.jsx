import React, { useState, useRef, useEffect } from 'react';

function KaleidoscopeEffect() {
  const [imageUrl, setImageUrl] = useState('');
  const [slices, setSlices] = useState(12); // Initial number of kaleidoscope slices
  const [rotate, setRotate] = useState(false); // State to control rotation animation
  const canvasRef = useRef(null);
  const frameIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Load placeholder image if no URL is provided
    const image = new Image();
    image.src = imageUrl ? imageUrl : 'https://media1.giphy.com/media/3oEdv5SY4LBHUBe2o8/giphy.webp?cid=ecf05e47t9nfib0irj5onv0simkulvpf8io0fmoz5hbltyhz&ep=v1_gifs_search&rid=giphy.webp&ct=g';
    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const sliceAngle = (2 * Math.PI) / slices;

      const drawKaleidoscope = () => {
        for (let i = 0; i < slices; i++) {
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(i * sliceAngle);

          // Draw image slice
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(canvas.width / 2, 0);
          ctx.lineTo(
            canvas.width / 2,
            -Math.tan(sliceAngle / 2) * (canvas.width / 2)
          );
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          // Mirror image slice
          ctx.scale(1, -1);
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          ctx.restore();
        }

        // Draw mirrored images between slices
        for (let i = 0; i < slices - 1; i++) {
          const angle = ((i + 1) * sliceAngle) % (2 * Math.PI);
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(angle);

          // Mirror image
          ctx.scale(1, -1);
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          ctx.restore();
        }

        // Draw inner slices rotating in opposite direction
        for (let i = 0; i < slices; i++) {
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((2 * Math.PI - i * sliceAngle) % (2 * Math.PI)); // Rotate in the opposite direction

          // Draw image slice
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(canvas.width / 2, 0);
          ctx.lineTo(
            canvas.width / 2,
            -Math.tan(sliceAngle / 2) * (canvas.width / 2)
          );
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          // Mirror image slice
          ctx.scale(1, -1);
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          ctx.restore();
        }
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawKaleidoscope();
        if (rotate) {
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(Math.PI / 180); // Rotate by 1 degree per frame
          ctx.translate(-canvas.width / 2, -canvas.height / 2);
        }
        frameIdRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(frameIdRef.current);
      };
    };
  }, [imageUrl, slices, rotate]);

  const handleChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSliderChange = (e) => {
    setSlices(parseInt(e.target.value));
  };

  const handleLoadImage = () => {
    // Start rotation animation
    setRotate(true);
  };

  const handleStopRotation = () => {
    // Stop rotation animation
    setRotate(false);
  };

  const handleGenerate = () => {
    // Stop rotation animation
    setRotate(false);
  };

 const handleReset = () => {
  window.location.reload();
};


  return (
    <div>
      <input
        type="text"
        value={imageUrl}
        onChange={handleChange}
        placeholder="Enter image URL"
      />
      <button onClick={handleLoadImage}>Start</button>
      <br />
      <label htmlFor="slice-slider">Number of Slices:</label>
      <input
        type="range"
        id="slice-slider"
        min={3}
        max={36}
        value={slices}
        onChange={handleSliderChange}
      />
      <br />
     
      <button onClick={handleReset}>Reset</button>
      <br />
      <canvas
        ref={canvasRef}
        width={400} // Adjust as needed
        height={400} // Adjust as needed
        style={{ border: '3px solid purple' }}
      ></canvas>
    </div>
  );
}

export default KaleidoscopeEffect;
