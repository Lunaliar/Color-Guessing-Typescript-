import React, {useEffect, useState} from "react";
import "./styles/colorStyle.css";

const randColor = (): string => {
	return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
};

function ColorApp() {
	const [color, setColor] = useState<string>("");
	const [answers, setAnswers] = useState<string[]>([]);
	const [isWrong, setIsWrong] = useState<boolean | undefined>(undefined);
	const [disable, setDisable] = useState<boolean>(false);

	const generateColors = () => {
		const actualColor = randColor();
		setColor(actualColor);
		setAnswers(
			[actualColor, randColor(), randColor()].sort(() => 0.5 - Math.random())
		);
	};

	useEffect(() => {
		generateColors();
	}, []);

	const handleClick = (answer: string) => {
		if (answer === color) {
			setIsWrong(false);
			setDisable(true);
			setTimeout(() => {
				generateColors();
				setIsWrong(undefined);
				setDisable(false);
			}, 1500);
		} else {
			setIsWrong(true);
		}
	};

	return (
		<div className="color-app">
			<h1>Sav's Color Guessing Game</h1>
			<div className="guess-me" style={{backgroundColor: color}} />
			<div className="buttons">
				{answers.map((answer) => (
					<button
						key={answer}
						className="button"
						disabled={disable}
						onClick={() => handleClick(answer)}
					>
						{answer}
					</button>
				))}
			</div>
			<div className="answerContainer">
				{isWrong !== undefined && (
					<span className="correct" style={{color: isWrong ? "red" : "green"}}>
						{isWrong ? "Wrong Answer" : "Correct!"}
					</span>
				)}
			</div>
		</div>
	);
}

export default ColorApp;
