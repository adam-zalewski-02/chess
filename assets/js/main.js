"use strict";
document.addEventListener('DOMContentLoaded', init);

function init() {
    const gameBoard = document.querySelector('#gameboard');
    createBoard(gameBoard);

    const allSquare = document.querySelectorAll('.square');
    allSquareAddEvent(allSquare);

    const allPieces = document.querySelectorAll('.piece');
    allPieceAddEvent(allPieces);
}

const width = 8;

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
]


function createBoard(gameBoard) {
    startPieces.forEach((piece, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = piece;
        square.firstChild?.setAttribute('draggable', true);
        square.setAttribute('square-id', i);

        const row = Math.floor((63 - i) / 8) + 1
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "beige" : "brown")
        } else {
            square.classList.add(i % 2 === 0 ? "brown" : "beige")
        }

        if ( i <= 15) {
            square.firstChild.firstChild.classList.add('black');
        }

        if ( i >= 48 ) {
            square.firstChild.firstChild.classList.add('white');
        }

        gameBoard.append(square);
    })
}





function allSquareAddEvent(squares) {
    squares.forEach(square => {
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop',dragDrop);
    })
}

function allPieceAddEvent(pieces) {
    pieces.forEach(piece => {
        piece.addEventListener('dragstart', dragStart);
    })
}

let startPositionId;
let draggedElement;
let currentPlayer = 'white';

function dragStart(e) {
    console.log("moved");
    startPositionId = e.currentTarget.parentNode.getAttribute('square-id');
    draggedElement = e.currentTarget;
}

function dragOver(e) {
    e.preventDefault();
}  

function dragDrop(e) {
    e.stopPropagation();
    console.log(e.target);
    const destinationSquare = e.currentTarget;
    if (!destinationSquare.firstChild) {
        destinationSquare.appendChild(draggedElement);
        draggedElement = null;
        return;
    }

    const draggedPieceColor = draggedElement.firstChild.classList.contains('black') ? 'black' : 'white';
    const destinationPieceColor = destinationSquare.firstChild.classList.contains('black') ? 'black' : 'white';

    if (draggedPieceColor === destinationPieceColor) {
        const startSquare = document.querySelector(`[square-id="${startPositionId}"]`);
        startSquare.appendChild(draggedElement);
    }

    //changePlayer();
}

function changePlayer() {
    if (currentPlayer === "white") {
        reverseId();
        currentPlayer = "black";
    } else {
        revertId();
        currentPlayer = "white";
    }
}

function reverseId() {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach((square, i) => {
        square.setAttribute('square-id', (width * width - 1) - i);
    })
}

function revertId() {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach((square, i) => {
        square.setAttribute('square-id', i);
    })
}