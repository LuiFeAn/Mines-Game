
class LevelGenerator {

    levelWidth
    levelHeight

    constructor(levelWidth,levelHeight){

        this.levelHeight = levelHeight,
        this.levelWidth = levelWidth

    }

    generate(){

        const gameContainer = document.querySelector('#game');

        for(let i = 0; i < this.levelHeight; i++){

            const wallContainer = document.createElement('div');

            wallContainer.classList.add('wall-container');

            gameContainer.appendChild(wallContainer);

            for(let x = 0; x < this.levelWidth; x++){

                const wall = document.createElement('img');

                wall.setAttribute('src','./src/images/wall.png');

                const hasBomb = Math.floor(Math.random() * 2);

                wall.classList.add(
                    hasBomb ? 'wall-with-bomb' : 'wall' 
                );

                wallContainer.appendChild(wall);

            }

        }

        const walls = document.querySelectorAll('.wall');

        const wallsContainer = document.querySelectorAll('.wall-container');

        const wallsWithBomb = document.querySelectorAll('.wall-with-bomb');

        return {
            walls,
            wallsContainer,
            wallsWithBomb
        }

    }

}

class Game{

    level

    points


    constructor(level){

        this.level = level;

        this.points = 0;

    }


    get hit(){

        const random = Math.ceil(Math.random() * 3);

        return this.points += random;

    }

    start(){

        const pointsElement = document.querySelector('#points');

        const gameOver = document.querySelector('.game-over-modal');

        const restart = document.querySelector('button');

        restart.onclick = () => {

            window.location.reload();

        }

        if(this.level){

            const { walls, wallsWithBomb } = this.level;

            function wallEvent(walls,action){

                walls.forEach( (wall,id) => {

                    wall.onclick = () => action(wall,id);

                })

            }

            wallEvent(walls,(wall) => {

                pointsElement.innerHTML = `Pontos: ${this.hit}`;

                wall.setAttribute('src','./src/images/white-background.png');

            });

            wallEvent(wallsWithBomb,(wall)=>{

                gameOver.style.display = 'flex';

                wall.setAttribute('src','./src/images/bomb.png');

            })

        }else{

            throw new Error('Please send the level design');

        }

    }


}

const level = new LevelGenerator(8,8);

const game = new Game(level.generate());

game.start();