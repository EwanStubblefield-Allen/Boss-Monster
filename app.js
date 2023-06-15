const heroes = [
  {
    name: 'Slate Slabrock',
    type: 'dwarf',
    damage: 5,
    originalDamage: 5,
    health: 100,
    maxHealth: 100,
    originalHealth: 100,
    isAlive: true,
    level: 1
  },
  {
    name: 'Flint Ironstag',
    type: 'elf',
    damage: 10,
    originalDamage: 10,
    health: 50,
    maxHealth: 100,
    originalHealth: 50,
    isAlive: true,
    level: 1
  }
]

const boss = {
  health: 100,
  maxHealth: 100,
  originalHealth: 100,
  damage: 5,
  originalDamage: 5,
  level: 1,
  defeatedCount: 0,
  reward: 10,
  originalReward: 10
}

let totalGold = 20

function attackBoss() {
  heroes.forEach(hero => {
    if (hero.isAlive) {
      boss.health -= hero.damage
    }
  })

  if (boss.health <= 0) {
    boss.level++
    totalGold += boss.reward
    checkLevel("", false)
  }

  drawHealth()
}

function drawHealth() {
  heroes.forEach(hero => {
    let heroLevel = document.getElementById(`level${hero.type}`)
    let heroHealth = document.getElementById(`${hero.type}Health`)
    heroLevel.innerText = hero.level
    heroHealth.innerText = hero.health
  });

  let bossHealth = document.getElementById('healthBar')
  let bossLevel = document.getElementById('bossLevel')
  let bossDefeated = document.getElementById('monstersDefeated')
  let gold = document.getElementById('gold')

  bossDefeated.innerText = boss.defeatedCount
  bossLevel.innerText = boss.level
  gold.innerText = totalGold
  bossHealth.innerHTML = `
    <div class="progress-bar bg-danger" role = "progressbar" aria - valuenow="70" aria - valuemin="0"
  aria - valuemax="100" style = "width:${boss.health / boss.maxHealth * 100}%" >
    </div>`
}

function bossAttack() {
  heroes.forEach(hero => hero.health -= boss.damage)
  endGame()
  drawHealth()
}

function endGame() {
  let killedHeroes = 0
  heroes.forEach(hero => {
    if (hero.health < 0) {
      killedHeroes++
      hero.health = 0
      hero.isAlive = false
    }
  })
  if (killedHeroes == heroes.length) {
    window.alert('game over')
    resetGame()
  }
}

function buyPotion(heroName) {
  let foundHero = heroes.find(hero => hero.type == heroName)
  if (totalGold >= 20 && foundHero.isAlive) {
    totalGold -= 20
    foundHero.health += 10
  }
  drawHealth()
}

function levelUp(heroName) {
  let foundHero = heroes.find(hero => hero.type == heroName)
  if (totalGold >= 50 && foundHero.isAlive) {
    totalGold -= 50
    foundHero.level++
    checkLevel(foundHero, false)
  }
  drawHealth()
}

function resetGame() {
  heroes.forEach(hero => {
    hero.isAlive = true
    hero.level = 1
    boss.level = 1
    checkLevel(hero, true)
  });
}

function checkLevel(hero, isReset) {
  if (isReset) {
    hero.maxHealth = hero.originalHealth
    hero.damage = hero.originalDamage
    boss.maxHealth = boss.originalHealth
    boss.reward = boss.originalReward
    boss.damage = boss.originalDamage
    totalGold = 20
  } else {
    hero.maxHealth = hero.maxHealth * hero.level
    hero.damage = hero.damage * hero.level
    boss.maxHealth = boss.maxHealth + (boss.level * 10)
    boss.reward = boss.reward * (boss.level * .5)
    boss.damage = boss.damage + (boss.level * 0.25)
  }
  hero.health = hero.maxHealth
  boss.health = boss.maxHealth
  boss.defeatedCount = boss.level - 1
}

drawHealth()
setInterval(bossAttack, 1000)