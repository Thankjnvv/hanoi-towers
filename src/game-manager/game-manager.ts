import { Game } from "../game";
import { IOHandler } from "../interfaces";
import { GameManagerOutputHandler, GameManagerInputHandler } from "./interfaces";

export class GameManager {
    private _game: Game;
    private _isGameFinished: boolean = false;

    constructor(amountOfPoles: number,
        amountOfDisks: number,
        private _inputHandler: GameManagerInputHandler,
        private _outputHandler: GameManagerOutputHandler) {
        this._game = new Game(amountOfPoles, amountOfDisks, this.onGameFinished.bind(this));
    }

    async run(): Promise<void> {
        while (!this._isGameFinished) {
            await this._outputHandler.printBoard(this._game);
            const { fromIndex, toIndex } = await this._inputHandler.readMove();
            this._game.moveDisk(fromIndex, toIndex);
        }
    }

    private async onGameFinished() {
        this._isGameFinished = true;
        await this._outputHandler.printBoard(this._game);
        await this._outputHandler.printWinningMessage(this._game);
    }

}