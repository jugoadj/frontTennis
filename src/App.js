import React, { useState } from "react";
import axios from "axios";
import Result from "./pages/resultats";

const App = () => {
  const [player1, setPlayer1] = useState({ name: "", level: 5 });
  const [player2, setPlayer2] = useState({ name: "", level: 5 });
  const [points, setPoints] = useState([]);
  const [result, setResult] = useState(null);
  const [probaJr1, setProbaJr1] = useState(0);
  const [probaJr2, setProbaJr2] = useState(0);


  const generatePoints = async () => {
  const totalPoints = 150;
  const newPoints = [];

  for (let i = 0; i < totalPoints; i++) {
    const probaJr1 = player1.level / (player1.level + player2.level);
    setProbaJr1(probaJr1);
    const probaJr2 = player2.level / (player1.level + player2.level);
    setProbaJr2(probaJr2);

    const randomValue = Math.random();

    if (randomValue < probaJr1) {
      newPoints.push(player1.name || "Joueur 1");
    } else {
      newPoints.push(player2.name || "Joueur 2");
    }
  }
  // probaJr1 = 7 / (7 + 3) = 7 / 10 = 0.7 (70 %).
  // probaJr2 = 3 / (7 + 3) = 3 / 10 = 0.3 (30 %).
// Math.random() génère un nombre aléatoire entre 0 et 1, 
// si ce nombre est inférieur à 0.7, player1 gagne. Cela signifie 
// que 70 % du temps, player1 gagnera le point.
// Pour player2, le nombre aléatoire doit être supérieur ou égal 
// à 0.7 pour que player2 gagne. Cela se produira seulement 
// 30 % du temps

  setPoints(newPoints);
};
  
  const calculateScore = async () => {
    try {
      const response = await axios.post("https://backtennis.onrender.com/api/tenis/calculate-score", {
        points,
        players: [player1.name || "Joueur 1", player2.name || "Joueur 2"],
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error calculating score:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎾 Match de Tennis</h1>

      <div className="settings">
        <h2>Parametres Joueurs</h2>
        <div className="player1">
          <label className="player1lbl">
            Nom du joueur 1:
            <input
              type="text"
              value={player1.name}
              onChange={(e) => setPlayer1({ ...player1, name: e.target.value })}
            />
          </label>
          <label className="player1lvl">
            Niveau (1-10):
            <input
              type="number"
              min="1"
              max="10"
              value={player1.level}
              onChange={(e) => setPlayer1({ ...player1, level: parseInt(e.target.value, 10) })}
            />
          </label>
        </div>

        <div className="player2">
          <label className="player2lbl">
            Nom du joueur 2:
            <input
              type="text"
              value={player2.name}
              onChange={(e) => setPlayer2({ ...player2, name: e.target.value })}
            />
          </label>
          <label className="player2lvl">
            Niveau (1-10):
            <input
              type="number"
              min="1"
              max="10"
              value={player2.level}
              onChange={(e) => setPlayer2({ ...player2, level: parseInt(e.target.value, 10) })}
            />
          </label>
        </div>
      </div>

      <button className="genPnt" onClick={generatePoints} style={{ marginRight: "10px" }}>
        Générer les Points
      </button>
      <button className="calcScr" onClick={calculateScore} disabled={points.length === 0}>
        Calculer le Score
      </button>

      <div>
        {points.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h2>Points Générés</h2>
            <h2>{(probaJr1 * 100).toFixed()} % des points sont gagnés par {player1.name}</h2>
            <div className="slide-container">
              <ul>
                {points.map((point, index) => (
                  <li key={index}>
                    Point {index + 1}: gagné par {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {result && (
        <Result player1={player1} player2={player2} result={result} setResult={setResult} />
      )}
    </div>
  );
};

export default App;
