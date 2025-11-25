// ============================================
// ESTADO DO JOGO
// ============================================
const gameState = {
    team1: {
      currentScore: 0,
      sets: [0, 0, 0],
      setsWon: 0,
      name: "Equipe 1",
    },
    team2: {
      currentScore: 0,
      sets: [0, 0, 0],
      setsWon: 0,
      name: "Equipe 2",
    },
    currentSet: 1,
    gameOver: false,
  }
  
  let lastState = null
  
  // ============================================
  // FUNÇÕES PRINCIPAIS
  // ============================================
  
  function addPoint(team) {
    if (gameState.gameOver) return
  
    lastState = {
      team1Score: gameState.team1.currentScore,
      team2Score: gameState.team2.currentScore,
      team1Sets: [...gameState.team1.sets],
      team2Sets: [...gameState.team2.sets],
      team1SetsWon: gameState.team1.setsWon,
      team2SetsWon: gameState.team2.setsWon,
      currentSet: gameState.currentSet,
    }
  
    gameState[`team${team}`].currentScore++
  
    checkSetWinner()
    updateDisplay()
  }
  
  function removePoint() {
    if (!lastState) return
  
    gameState.team1.currentScore = lastState.team1Score
    gameState.team2.currentScore = lastState.team2Score
    gameState.team1.sets = lastState.team1Sets
    gameState.team2.sets = lastState.team2Sets
    gameState.team1.setsWon = lastState.team1SetsWon
    gameState.team2.setsWon = lastState.team2SetsWon
    gameState.currentSet = lastState.currentSet
    gameState.gameOver = false
  
    lastState = null
    updateDisplay()
  }
  
  function checkSetWinner() {
    const team1Score = gameState.team1.currentScore
    const team2Score = gameState.team2.currentScore
    const currentSet = gameState.currentSet
  
    const maxPoints = currentSet <= 2 ? 25 : 15
    const minDifference = 2
  
    // Verificar se alguém venceu o set
    if (team1Score >= maxPoints && team1Score - team2Score >= minDifference) {
      winSet(1)
    } else if (team2Score >= maxPoints && team2Score - team1Score >= minDifference) {
      winSet(2)
    }
  }
  
  function winSet(team) {
    const opponent = team === 1 ? 2 : 1
  
    gameState.team1.sets[gameState.currentSet - 1] = gameState.team1.currentScore
    gameState.team2.sets[gameState.currentSet - 1] = gameState.team2.currentScore
  
    gameState[`team${team}`].setsWon++
  
    if (gameState[`team${team}`].setsWon === 2) {
      endGame(team)
    } else {
      gameState.currentSet++
      gameState.team1.currentScore = 0
      gameState.team2.currentScore = 0
    }
  
    updateDisplay()
  }
  
  function endGame(winner) {
    gameState.gameOver = true
    const winnerName = gameState[`team${winner}`].name
    const statusText = document.getElementById("statusText")
    statusText.innerHTML = `🏆 ${winnerName} VENCEU O JOGO! 🏆`
    statusText.style.color = winner === 1 ? "#0066ff" : "#ff0000"
    statusText.style.fontSize = "2rem"
  }
  
  function resetGame() {
    gameState.team1.currentScore = 0
    gameState.team2.currentScore = 0
    gameState.team1.sets = [0, 0, 0]
    gameState.team2.sets = [0, 0, 0]
    gameState.team1.setsWon = 0
    gameState.team2.setsWon = 0
    gameState.currentSet = 1
    gameState.gameOver = false
    lastState = null
  
    updateDisplay()
  }
  
  function updateTeamName(team) {
    const input = document.getElementById(`team${team}Name`)
    gameState[`team${team}`].name = input.value || `Equipe ${team}`
  }
  
  // ============================================
  // ATUALIZAR DISPLAY
  // ============================================
  
  function updateDisplay() {
    document.getElementById("team1Score").textContent = gameState.team1.currentScore
    document.getElementById("team2Score").textContent = gameState.team2.currentScore
  
    for (let i = 0; i < 3; i++) {
      document.getElementById(`team1Set${i + 1}`).textContent = gameState.team1.sets[i]
      document.getElementById(`team2Set${i + 1}`).textContent = gameState.team2.sets[i]
    }
  
    document.getElementById("team1SetsWon").textContent = gameState.team1.setsWon
    document.getElementById("team2SetsWon").textContent = gameState.team2.setsWon
  
    updateGameStatus()
  }
  
  function updateGameStatus() {
    const statusText = document.getElementById("statusText")
  
    if (gameState.gameOver) {
      return
    }
  
    const maxPoints = gameState.currentSet <= 2 ? 25 : 15
    const setInfo = gameState.currentSet === 3 ? "Desempate (Set 3)" : `Set ${gameState.currentSet}`
  
    statusText.textContent = `${setInfo} em andamento... (até ${maxPoints} pontos)`
    statusText.style.color = "#ffffff"
    statusText.style.fontSize = "1.5rem"
  }
  
  // ============================================
  // INICIALIZAÇÃO
  // ============================================
  
  document.addEventListener("DOMContentLoaded", () => {
    updateDisplay()
  })
  