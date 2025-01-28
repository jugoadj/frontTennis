import React from "react";

import "./result.css";

const Result = ({ player1, player2, result, setResult }) => {
  if (!result) {
    return <p>No results to display yet!</p>;
  }

  const closePopup = () => {
    setResult(null);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={closePopup}>
          &times;
        </button>
        <h2>Résultat du Match</h2>
        <p><strong>Vainqueur :</strong> {result.winner || "Match en cours"}</p>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th></th>
              <th>Set 1</th>
              <th>Set 2</th>
              <th>Set 3</th>
              <th>Jeu actuel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{player1.name || "Joueur 1"}</td>
              <td>{result.sets[0]?.joueur1 || 0}</td>
              <td>{result.sets[1]?.joueur1 || 0}</td>
              <td>{result.sets[2]?.joueur1 || 0}</td>
              <td>{result.currentGame.joueur1 || 0}</td>
            </tr>
            <tr>
              <td>{player2.name || "Joueur 2"}</td>
              <td>{result.sets[0]?.joueur2 || 0}</td>
              <td>{result.sets[1]?.joueur2 || 0}</td>
              <td>{result.sets[2]?.joueur2 || 0}</td>
              <td>{result.currentGame.joueur2 || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;
