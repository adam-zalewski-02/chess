"use strict";
document.addEventListener('DOMContentLoaded', init);

function init() {
    createBoard();
}

const gameBoard = document.querySelector('#gameboard')
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


function createBoard() {
    startPieces.forEach(piece => {
        const square = document.createElement('div');
        square.classList.add('square');
    })
}