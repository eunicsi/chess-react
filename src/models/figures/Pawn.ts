import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-pawn.png"
import whiteLogo from "../../assets/white-pawn.png"

export class Pawn extends Figure {
    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = (color === Colors.BLACK) ? blackLogo : whiteLogo;
        this.name = FigureNames.PAWN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target))
            return false;

        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

        // check diagonal eat
        if (this.cell.isEnemy(target) && (this.cell.x === target.x + 1 || this.cell.x === target.x - 1) && this.cell.y + direction === target.y)
            return true;

        // check vertical move
        if (!this.cell.isEmptyVertical(target))
            return false;

        if (this.cell.y + direction !== target.y && (!this.isFirstStep || this.cell.y + firstStepDirection !== target.y))
            return false;

        if (this.cell.x !== target.x)
            return false;

        if (!this.cell.board.getCell(target.x, target.y).isEmpty())
            return false;

        return true;
    }

    moveFigure(target: Cell): void {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}