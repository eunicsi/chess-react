import React, {FC, useEffect, useRef, useState} from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
    const [whiteTime, setWhiteTime] = useState(11);
    const [blackTime, setBlackTime] = useState(11);
    const timer = useRef<null | ReturnType<typeof setInterval>>();

    useEffect(() => {
        startTimer();
    }, [currentPlayer]);

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;

        timer.current = setInterval(callback, 1000);
    }

    function decrementWhiteTimer() {
        setWhiteTime(whiteTime => whiteTime - 1);
    }

    function decrementBlackTimer() {
        setBlackTime(blackTime => blackTime - 1);
    }

    const handleRestartGame = () => {
        setWhiteTime(300);
        setBlackTime(300);
        restart();
    }

    return (
        <div className="timer">
            <div>
                <button
                    onClick={handleRestartGame}
                >
                    Restart game
                </button>
            </div>
            <h2>Белые - {whiteTime}</h2>
            <h2>Черные - {blackTime}</h2>
        </div>
    );
};

export default Timer;