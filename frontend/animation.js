/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

document.addEventListener('DOMContentLoaded', () => {
    const gridBg = document.querySelector('.grid-bg');
    const tileSize = 40;
    
    gridBg.innerHTML = '';
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    gridBg.appendChild(gridContainer);
    
    const numTilesX = Math.ceil(window.innerWidth / tileSize) + 1;
    const numTilesY = Math.ceil(window.innerHeight / tileSize) + 1;
    
    const tiles = [];
    
    for (let y = 0; y < numTilesY; y++) {
        for (let x = 0; x < numTilesX; x++) {
            const tile = document.createElement('div');
            tile.className = 'grid-tile';
            tile.style.left = `${x * tileSize}px`;
            tile.style.top = `${y * tileSize}px`;
            tile.dataset.x = x;
            tile.dataset.y = y;
            gridContainer.appendChild(tile);
            tiles.push(tile);
        }
    }
    
    document.addEventListener('mousemove', (e) => {
        const x = Math.floor(e.clientX / tileSize);
        const y = Math.floor(e.clientY / tileSize);
        
        const currentTile = tiles.find(tile => 
            parseInt(tile.dataset.x) === x && parseInt(tile.dataset.y) === y
        );
        if (currentTile) {
            currentTile.style.backgroundColor = '#ffffff';
            currentTile.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.5)';
            currentTile.style.transition = 'background-color 0.2s ease, box-shadow 0.2s ease';
        }
    });
    
    function randomFill() {
        const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
        if (randomTile) {
            randomTile.style.backgroundColor = '#dddddd';
            randomTile.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.5)';
            randomTile.style.transition = 'background-color 0.5s ease, box-shadow 0.5s ease';
            
            setTimeout(() => {
                randomTile.style.backgroundColor = 'transparent';
                randomTile.style.boxShadow = 'none';
            }, 1000 + Math.random() * 2000);
        }
        
        setTimeout(randomFill, 100 + Math.random() * 200);
    }
    
    randomFill();

    window.triggerRedBlink = () => {
        const blinkCount = 10;
        let blinks = 0;

        const blink = () => {
            const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
            if (randomTile) {
                randomTile.style.backgroundColor = '#ff0000';
                randomTile.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.8)';
                randomTile.style.transition = 'background-color 0.5s ease, box-shadow 0.5s ease';
                
                setTimeout(() => {
                    randomTile.style.backgroundColor = 'transparent';
                    randomTile.style.boxShadow = 'none';
                }, 500);
            }

            blinks++;
            if (blinks < blinkCount) {
                setTimeout(blink, 300);
            }
        };

        blink();
    };

    window.triggerGreenBlink = () => {
        const blinkCount = 5;
        let blinks = 0;

        const blink = () => {
            const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
            if (randomTile) {
                randomTile.style.backgroundColor = '#22c55e';
                randomTile.style.boxShadow = '0 0 15px rgba(34, 197, 94, 0.8)';
                randomTile.style.transition = 'background-color 0.5s ease, box-shadow 0.5s ease';
                
                setTimeout(() => {
                    randomTile.style.backgroundColor = 'transparent';
                    randomTile.style.boxShadow = 'none';
                }, 500);
            }

            blinks++;
            if (blinks < blinkCount) {
                setTimeout(blink, 200);
            }
        };

        blink();
    };
    
    window.addEventListener('resize', () => {
        const newNumTilesX = Math.ceil(window.innerWidth / tileSize) + 1;
        const newNumTilesY = Math.ceil(window.innerHeight / tileSize) + 1;
        
        if (newNumTilesX !== numTilesX || newNumTilesY !== numTilesY) {
            gridContainer.innerHTML = '';
            tiles.length = 0;
            for (let y = 0; y < newNumTilesY; y++) {
                for (let x = 0; x < newNumTilesX; x++) {
                    const tile = document.createElement('div');
                    tile.className = 'grid-tile';
                    tile.style.left = `${x * tileSize}px`;
                    tile.style.top = `${y * tileSize}px`;
                    tile.dataset.x = x;
                    tile.dataset.y = y;
                    gridContainer.appendChild(tile);
                    tiles.push(tile);
                }
            }
        }
    });
});
