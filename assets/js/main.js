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
    const destinationSquare = e.currentTarget;

    if (!destinationSquare.firstChild) {
        const startRow = Math.floor(startPositionId / width);
        const startCol = startPositionId % width;
        const destRow = Math.floor(destinationSquare.getAttribute('square-id') / width);
        const destCol = destinationSquare.getAttribute('square-id') % width;

        switch (draggedElement.id) {
            case 'pawn':
                handlePawnMove(startRow, startCol, destRow, destCol, destinationSquare);
                break;
            default:
                //other pieces
                break;
        }
    }

}

function handlePawnMove(startRow, startCol, destRow, destCol, destinationSquare) {
    if (
        (currentPlayer === 'white' && destRow === startRow - 1 && destCol === startCol) ||
        (currentPlayer === 'black' && destRow === startRow + 1 && destCol === startCol) ||
        (currentPlayer === 'white' && startRow === 6 && destRow === 4 && destCol === startCol) ||
        (currentPlayer === 'black' && startRow === 1 && destRow === 3 && destCol === startCol)
    ) {
        console.log("destrow: " + destRow + " startRow: " + startRow);
        destinationSquare.appendChild(draggedElement);
        refreshDraggedElement();
        changePlayer();
    } else {
        const startSquare = document.querySelector(`[square-id="${startPositionId}"]`);
        startSquare.appendChild(draggedElement);
        refreshDraggedElement();
    }
}

function refreshDraggedElement() {
    draggedElement = null;
}

function changePlayer() {
    if (currentPlayer === "white") {
        currentPlayer = "black";
    } else {
        currentPlayer = "white";
    }
}