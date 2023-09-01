"use strict";
document.addEventListener('DOMContentLoaded', init);

function init() {
    const gameBoard = document.querySelector('#gameboard');
    createBoard(gameBoard);
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
        square.setAttribute('square-id', i);
        const row = Math.floor((63 - i) / 8) + 1
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "beige" : "brown")
        } else {
            square.classList.add(i % 2 === 0 ? "brown" : "beige")
        }

        gameBoard.append(square);
    })
}