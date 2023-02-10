import { useState } from 'react';
import './photoSlider.css';

const images = [
  'https://pp.userapi.com/p5lLW61eQ4z0FaMowxuGt6_66RbHioWQcMV2qQ/dhxxejmJHfE.jpg',
  'https://vseseriipodriad.ru/uploads/jmgallery/444/0042596954.jpg',
  'https://vseseriipodriad.ru/uploads/jmgallery/444/0380685067.jpg',
  'https://allmults.org/img/f_b/3/2799/4.jpg',
];

const PhotoSlider = () => {
  const [currentImg, setCurrentImg] = useState(0);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentImg = e.target as HTMLDivElement;
    const allSlides = document.querySelectorAll('.gallery__slide') as NodeListOf<Element>;
    allSlides.forEach((slide) => {
      slide.classList.remove('gallery__slide_active');
    });
    setCurrentImg(Number(currentImg.dataset.index));
    currentImg.classList.add('gallery__slide_active');
  };

  return (
    <>
      {images.length > 0 && (
        <div className="gallery__wrap">
          <img src={images[currentImg]} className="gallery__image" alt="Фото" />
          {images.length > 1 && (
            <div className="gallery__slider">
              {images.map((_, index: number) => (
                <div
                  data-index={index}
                  key={index}
                  className={
                    index === 0
                      ? 'gallery__slide' + ' ' + 'gallery__slide_active'
                      : 'gallery__slide'
                  }
                  onMouseOver={handleMouseOver}
                ></div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PhotoSlider;
