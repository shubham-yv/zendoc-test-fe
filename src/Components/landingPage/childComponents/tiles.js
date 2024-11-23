import React from 'react';

const Tiles = ({ tile, tileClickHandler }) => {
    const handleTileClick = (event) => {
        const name = event.currentTarget.getAttribute('name');
        console.log(`Tile with ID ${name} clicked`);
        tileClickHandler(name);
    };

    const tilesClass = tile.id === 1 ? 'tile tile__title-consulting' : 'tile';
    const tileicon = 'tile__icon ' + tile.iconClass;
    const titleClass = tile.id === 1 ? 'tile__title white-title' : 'tile__title';

    return (
        <div className='tile-parent'>
            <div name={tile.id} className={tilesClass} onClick={handleTileClick}>
                <div name={tile.id} className={tileicon}></div>
                <div name={tile.id} className={titleClass}>
                    {tile.title}
                </div>
                {tile.id !== 1 && (
                    <>
                        <div name={tile.id} className='tile__desc'>
                            {tile.description}
                        </div>
                        <div name={tile.id} className='tile__footer'>
                            <div className='tilte__footer-image fas fa-arrow-right'></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Tiles;
